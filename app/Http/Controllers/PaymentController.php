<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Enrollment;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Create QRIS payment via Midtrans for an enrollment.
     */
    public function createQris(Request $request)
    {
        $data = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
        ]);

        $enrollment = Enrollment::with('course')->findOrFail($data['enrollment_id']);
        $amount = (int) ($enrollment->course->price ?? 0);

        if ($amount <= 0) {
            return response()->json(['message' => 'Course price is invalid'], 400);
        }

        // Prevent duplicate pending payments
        $existing = Payment::where('enrollment_id', $enrollment->id)
            ->where('status', 'pending')
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Existing pending payment',
                'payment' => $existing,
            ], 200);
        }

        // Dummy mode: bypass Midtrans and create a local pending payment
        if (config('midtrans.dummy')) {
            $orderId = MidtransService::generateOrderId($enrollment->id);
            $expiresAt = Carbon::now()->addMinutes(30);
            $payment = Payment::create([
                'enrollment_id' => $enrollment->id,
                'amount' => $amount,
                'status' => 'pending',
                'payment_method' => 'qris',
                'order_id' => $orderId,
                'qr_string' => null,
                'qr_url' => null,
                'expires_at' => $expiresAt,
                'raw_response' => json_encode(['dummy' => true]),
            ]);

            return response()->json([
                'message' => 'QRIS created',
                'payment' => $payment,
            ], 201);
        }

        $orderId = MidtransService::generateOrderId($enrollment->id);
        $midtrans = new MidtransService();

        try {
            Log::info('Creating QRIS charge', ['orderId' => $orderId, 'amount' => $amount]);
            $charge = $midtrans->createQrisCharge($orderId, $amount);
            Log::info('QRIS charge created', ['charge' => $charge]);
        } catch (\Exception $e) {
            Log::error('Failed to create QRIS charge', [
                'orderId' => $orderId,
                'amount' => $amount,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Failed to create QRIS charge',
                'error' => $e->getMessage(),
            ], 500);
        }

        $expiresAt = isset($charge['expiry_time'])
            ? Carbon::parse($charge['expiry_time'])
            : Carbon::now()->addMinutes(30);

        $payment = Payment::create([
            'enrollment_id' => $enrollment->id,
            'amount' => $amount,
            'status' => 'pending',
            'payment_method' => 'qris',
            'order_id' => $charge['order_id'] ?? $orderId,
            'qr_string' => $charge['actions'][0]['url'] ?? ($charge['qr_string'] ?? null),
            'qr_url' => $charge['actions'][0]['url'] ?? null,
            'expires_at' => $expiresAt,
            'raw_response' => $charge,
        ]);

        return response()->json([
            'message' => 'QRIS created',
            'payment' => $payment,
        ], 201);
    }

    /**
     * Get status from Midtrans and update local record.
     */
    public function status($orderId)
    {
        $payment = Payment::where('order_id', $orderId)->firstOrFail();
        // Dummy mode: immediately mark as completed
        if (config('midtrans.dummy')) {
            if ($payment->status !== 'completed') {
                $payment->update([
                    'status' => 'completed',
                    'raw_response' => json_encode(['dummy' => true, 'auto_settle' => true]),
                ]);
            }
            return response()->json([
                'payment' => $payment,
                'midtrans_status' => ['transaction_status' => 'settlement'],
            ]);
        }

        $midtrans = new MidtransService();

        try {
            $status = $midtrans->getStatus($orderId);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch status',
                'error' => $e->getMessage(),
            ], 500);
        }

        $mapped = $this->mapStatus($status['transaction_status'] ?? null);
        if ($mapped && $payment->status !== $mapped) {
            $payment->update([
                'status' => $mapped,
                'raw_response' => $status,
            ]);
        }

        return response()->json([
            'payment' => $payment,
            'midtrans_status' => $status,
        ]);
    }

    /**
     * Webhook handler (optional, keeps polling flow intact).
     */
    public function webhook(Request $request)
    {
        $orderId = $request->input('order_id');
        $transactionStatus = $request->input('transaction_status');

        if (!$orderId) {
            return response()->json(['message' => 'order_id missing'], 400);
        }

        $payment = Payment::where('order_id', $orderId)->first();
        if (!$payment) {
            return response()->json(['message' => 'payment not found'], 404);
        }

        $mapped = $this->mapStatus($transactionStatus);
        if ($mapped && $payment->status !== $mapped) {
            $payment->update([
                'status' => $mapped,
                'raw_response' => $request->all(),
            ]);
        }

        return response()->json(['message' => 'ok']);
    }

    /**
     * Fetch latest payment by enrollment (for frontend fetch).
     */
    public function byEnrollment($enrollmentId)
    {
        $payment = Payment::where('enrollment_id', $enrollmentId)
            ->latest('id')
            ->first();

        if (!$payment) {
            return response()->json(['message' => 'No payment found'], 404);
        }

        return response()->json(['payment' => $payment]);
    }

    private function mapStatus(?string $midtransStatus): ?string
    {
        return match($midtransStatus) {
            'settlement', 'capture' => 'completed',
            'pending' => 'pending',
            'expire', 'cancel', 'deny' => 'failed',
            default => null,
        };
    }
}
