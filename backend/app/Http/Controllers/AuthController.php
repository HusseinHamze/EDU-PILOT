<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:student,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = \DB::table('student')->insert([
            'Name' => $validatedData['username'],
            'Email' => $validatedData['email'],
            'Password' => Hash::make($validatedData['password']),
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        return response()->json(['message' => 'Login successful', 'user' => $user]);
    }
}