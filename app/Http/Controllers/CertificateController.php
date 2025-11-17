<?php

namespace App\Http\Controllers;

use App\Models\Certificate;

class CertificateController extends Controller
{
    public function show($id)
    {
        return Certificate::findOrFail($id);
    }
}
