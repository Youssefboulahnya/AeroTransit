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
        'ID_admin' => 'required',
        'password' => 'required',
    ]);

    $admin = Admin::find($request->ID_admin);

    
    if (!$admin || !Hash::check($request->password, $admin->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Start a session
    

    return response()->json(['message' => 'Access granted!']);
    }

    public function logout(Request $request)
    {
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

}
