<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6',
        ]);

        // Force any registration to be a student (role_id = 3)
        $data['role_id'] = 3;

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        // Beri token langsung setelah register (auto-login)
        $token = $user->createToken('devcourse_token')->plainTextToken;

        // Kembalikan struktur user yang konsisten dengan login
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'role' => optional($user->role)->name,
            'bio' => $user->bio,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
        ];

        return response()->json([
            'user' => $userData,
            'token' => $token
        ], 201);
    }


    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Cari user
        $user = User::where('email', $request->email)->first();

        // Jika user tidak ada
        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }


        // CEK PASSWORD (WAJIB!!!)
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Password salah'
            ], 401);
        }

        // Jika password benar → buat token
        $token = $user->createToken('auth')->plainTextToken;

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'role' => optional($user->role)->name,
            'bio' => $user->bio,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
        ];

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $userData,
        ]);
    }


    public function profile(Request $request)
    {
        return $request->user();
    }
}
