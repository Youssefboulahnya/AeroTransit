<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{

    public function liste_flight(){
        $flights = Flight::all();
        return response()->json($flights);
    }
    /**
     * Display a listing of the resource.
     */

    // the modifier_flight function

   public function modifier_flight(Request $request, $id)
    {
        $flight = Flight::findOrFail($id);

        $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string|different:origin',
            'temps_aller' => 'required|date',
            'temps_arriver' => 'required|date|after:temps_aller',
            'seats' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:scheduled,arrived',
        ]);

        $flight->update($request->all());

        return response()->json([
            'message' => 'Flight updated successfully',
            'flight' => $flight
        ]);
    }
    //idk lmao
   // creation d'une flight 
    public function creer_flight(Request $request)
{
    // ✅ Validations
    $validated = $request->validate([
        'origin'        => 'required|string',
        'destination'   => 'required|string|different:origin',  // origin != destination
        'temps_aller'   => 'required|date',
        'temps_arriver' => 'required|date|after:temps_aller',   // arrival > departure
        'seats'         => 'required|integer|min:0',            // no negative values
        'price'         => 'required|numeric|min:0',            // no negative price
        'status'        => 'required|in:scheduled,arrived',     // two only
    ]);

    // ✅ Create the flight
    $flight = Flight::create([
        'origin'        => $validated['origin'],
        'destination'   => $validated['destination'],
        'temps_aller'   => $validated['temps_aller'],
        'temps_arriver' => $validated['temps_arriver'],
        'seats'         => $validated['seats'],
        'price'         => $validated['price'],
        'status'        => $validated['status'],
    ]);

    // ✅ Response sent to React
    return response()->json([
        'message' => 'Flight created successfully',
        'flight'  => $flight
    ], 201);
}


public function delete_flight($id)
{
    // 1. Look for the flight
    $flight = Flight::find($id);

    // 2. If it does not exist
    if (!$flight) {
        return response()->json([
            'message' => 'Flight not found'
        ], 404);
    }

    // 3. Delete the flight
    $flight->delete();

    // 4. Return a success response
    return response()->json([
        'message' => 'Flight deleted successfully'
    ], 200);
}


    

    
    

    
    
}
