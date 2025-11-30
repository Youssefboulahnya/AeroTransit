<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Flight;
use App\Models\Reservation;
use App\Models\Passenger;

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

    
    $admin = Admin::where('email', $request->email)->first();

    
    if (!$admin || !Hash::check($request->password, $admin->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    
    return response()->json([
        'status' => 'success',
        'message' => 'Access granted!'
    ], 200);
}


public function getDashboardStats()
    {
        // Number of flights still scheduled (future or not yet arrived)
        $scheduledFlights = Flight::where('temps_arriver', '>', now())->count();

        // Number of flights that have already arrived
        $arrivedFlights = Flight::where('temps_arriver', '<=', now())->count();

        // Total number of reservations
        $totalReservations = Reservation::count();

        // Total number of passengers
        $totalPassengers = Passenger::count();

        return response()->json([
            'scheduled_flights'   => $scheduledFlights,
            'arrived_flights'     => $arrivedFlights,
            'reservations_count'  => $totalReservations,
            'passengers_count'    => $totalPassengers,
        ]);
    }





public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}
}
