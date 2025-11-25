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
            'places_business_economy' => 'required|integer|min:1|max:150',
            'places_business_classe' => 'required|integer|min:1|max:30',
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
        'places_business_economy' => 'required|integer|min:0|max:150',            // no negative values
        'places_business_classe' => 'required|integer|min:0|max:30',            // no negative values
        'price'         => 'required|numeric|min:0',            // no negative price
        'status'        => 'required|in:scheduled,arrived',     // only scheduled or arrived
        'created_by'    => 'required|exists:admins,ID_admin',   // ensure this admin exists
    ]);

    // ✅ Create the flight
    $flight = Flight::create([
        'origin'        => $request->origin,
        'destination'   => $request->destination,
        'temps_aller'   => $request->temps_aller,
        'temps_arriver' => $request->temps_arriver,
        'places_business_economy' => $request->places_business_economy,
        'places_business_classe' => $request->places_business_classe,
        'price'         => $request->price,
        'status'        => $request->status,
        'created_by'    => $request->created_by,
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
