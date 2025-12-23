<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);

// Load env
$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Check config
echo "MIDTRANS_SERVER_KEY: " . (getenv('MIDTRANS_SERVER_KEY') ?: 'NOT SET') . "\n";
echo "MIDTRANS_IS_PRODUCTION: " . (getenv('MIDTRANS_IS_PRODUCTION') ?: 'false') . "\n";

// Test MidtransService
$service = new \App\Services\MidtransService();

try {
    $orderId = 'qr-test-' . time();
    $amount = 100000;
    
    echo "\nTesting createQrisCharge:\n";
    echo "Order ID: $orderId\n";
    echo "Amount: $amount\n\n";
    
    $result = $service->createQrisCharge($orderId, $amount);
    
    echo "SUCCESS:\n";
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
} catch (\Exception $e) {
    echo "ERROR:\n";
    echo $e->getMessage() . "\n";
}
