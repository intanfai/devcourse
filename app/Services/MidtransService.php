<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class MidtransService
{
    private string $serverKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->serverKey = config('midtrans.server_key');
        $this->baseUrl = rtrim(config('midtrans.base_url'), '/');
    }

    private function headers(): array
    {
        return [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode($this->serverKey . ':'),
        ];
    }

    public function createQrisCharge(string $orderId, int $amount): array
    {
        $payload = [
            'payment_type' => 'qris',
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $amount,
            ],
        ];

        $url = $this->baseUrl . '/v2/charge';
        Log::info('Calling Midtrans API', [
            'url' => $url,
            'server_key' => substr($this->serverKey, 0, 10) . '***',
            'payload' => $payload,
        ]);

        $response = Http::withHeaders($this->headers())
            ->post($url, $payload);

        Log::info('Midtrans API response', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        if (!$response->successful()) {
            throw new \Exception('Midtrans charge failed: ' . $response->body());
        }

        return $response->json();
    }

    public function getStatus(string $orderId): array
    {
        $response = Http::withHeaders($this->headers())
            ->get($this->baseUrl . '/v2/' . $orderId . '/status');

        if (!$response->successful()) {
            throw new \Exception('Midtrans status failed: ' . $response->body());
        }

        return $response->json();
    }

    public static function generateOrderId(int $enrollmentId): string
    {
        return 'qr-' . $enrollmentId . '-' . Str::uuid();
    }
}
