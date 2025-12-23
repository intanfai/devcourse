<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'enrollment_id', 'amount', 'status', 'payment_method',
        'order_id', 'qr_string', 'qr_url', 'expires_at', 'raw_response'
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }
}
