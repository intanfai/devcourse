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

        // Return MINIMAL data
        $userData = [
            'name' => $user->name,
            'role_id' => $user->role_id,
            'role' => optional($user->role)->name,
            'avatar' => $user->avatar,
        ];

        return response()->json([
            'success' => true,
            'user' => $userData,
            'token' => $token
        ], 201)->cookie(
            'auth_token',
            $token,
            60 * 24 * 7,
            '/',
            null,
            true,
            true,
            false,
            'Strict'
        );
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
                'message' => 'Email atau password salah'
            ], 401);
        }


        // CEK PASSWORD (WAJIB!!!)
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        // Jika password benar → buat token
        $token = $user->createToken('auth')->plainTextToken;

        // Return MINIMAL data yang diperlukan frontend
        $userData = [
            'name' => $user->name,
            'role_id' => $user->role_id,
            'role' => optional($user->role)->name,
            'avatar' => $user->avatar,
        ];

        // Set token di httpOnly cookie untuk keamanan lebih
        return response()->json([
            'success' => true,
            'user' => $userData,
            'token' => $token, // Masih kirim untuk localStorage (bisa dihapus jika pakai cookie saja)
        ], 200)->cookie(
            'auth_token',
            $token,
            60 * 24 * 7, // 7 days
            '/',
            null,
            true, // secure (HTTPS only di production)
            true, // httpOnly (tidak bisa diakses JavaScript)
            false,
            'Strict' // SameSite
        );
    }


    public function profile(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'role' => optional($user->role)->name,
            'bio' => $user->bio,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ])->cookie(
            'auth_token',
            '',
            -1, // Expire immediately
            '/',
            null,
            true,
            true,
            false,
            'Strict'
        );
    }
}
