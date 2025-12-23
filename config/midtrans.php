<?php

return [
    'server_key' => env('MIDTRANS_SERVER_KEY', ''),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'base_url' => env('MIDTRANS_IS_PRODUCTION', false)
        ? 'https://api.midtrans.com'
        : 'https://api.sandbox.midtrans.com',
    // Enable dummy payments to bypass Midtrans for localhost/testing
    // Supports both MIDTRANS_DUMMY and PAYMENTS_DUMMY env flags
    'dummy' => env('MIDTRANS_DUMMY', env('PAYMENTS_DUMMY', false)),
];
