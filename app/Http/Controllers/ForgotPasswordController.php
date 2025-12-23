<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // mengirim link reset (mengembalikan status)
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'We have emailed your password reset link.'], 200);
        }

        // Jika ingin detail pesan error, bisa kirim langsung status
        return response()->json(['message' => trans($status)], 400);
    }
}
