<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return User::with('role')->get();
    }

    public function show($id)
    {
        return User::with(['role', 'enrollments'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json($user->load('role'), 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes','required','email', Rule::unique('users','email')->ignore($user->id)],
            'password' => 'nullable|string|min:6',
            'role_id' => 'sometimes|integer|exists:roles,id',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json($user->load('role'));
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }

    // Get instructor profile (untuk student preview course)
    public function getInstructorProfile($id)
    {
        $instructor = User::findOrFail($id);
        
        return response()->json([
            'id' => $instructor->id,
            'name' => $instructor->name,
            'bio' => $instructor->bio,
            'phone' => $instructor->phone,
            'avatar' => $instructor->avatar,
            'email' => $instructor->email,
        ]);
    }

    // Update instructor profile (untuk instructor edit profile)
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'bio' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|string', // Accept base64 or URL strings
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
}
