<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        // Jika user tidak login
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // roles = array of allowed role_id
        if (!in_array($user->role_id, $roles)) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return $next($request);
    }
}
