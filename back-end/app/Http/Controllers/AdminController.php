<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class AdminController extends Controller
{
    public function createAdmin(Request $request){

        try{
            $request->validate([
            'ID_admin' => 'required|integer',
            'password' => 'required|string|min:3',
            ]);
        }catch(ValidationException $e){
            return response()->json(['message' => 'Invalid data']);
        }

        if(Admin::find($request->ID_admin)){
                return response()->json(['message' => 'ID already exist']);
        }

        Admin::create([
            'ID_admin' => $request->ID_admin,
            'password' => Hash::make($request->password),
            ]);
        return response()->json(['message' => 'Admin created successfully ']); 
    }


   public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // CORRECTION 1: Use 'where' to find by email, not 'find'
    $admin = Admin::where('email', $request->email)->first();

    // Verify the password
    if (!$admin || !Hash::check($request->password, $admin->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Create the token
    

    // CORRECTION 2: Only one return statement. 
    // We send the token and the user info to React.
    return response()->json([
        'status' => 'success',
        'message' => 'Access granted!'
    ], 200);
}

public function logout(Request $request)
{
    // CORRECTION 3: Revoke the Token
    // We do not invalidate sessions in an API. We delete the token from the database.
    
    // Note: This requires the route to be protected by middleware('auth:sanctum')
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}
}
