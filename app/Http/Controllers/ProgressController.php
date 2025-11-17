<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'material_id' => 'required|exists:materials,id',
            'is_completed' => 'boolean'
        ]);

        return Progress::create($data);
    }
}
