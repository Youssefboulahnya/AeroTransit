<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


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

    $flight->update([
        'origin' => $request->origin,
        'destination' => $request->destination,
        'temps_aller' => $request->temps_aller,
        'temps_arriver' => $request->temps_arriver,
        'places_business_economy' => $request->places_business_economy,
        'places_business_classe' => $request->places_business_classe,
        'price' => $request->price,
        'status' => $request->status,
    ]);

    return response()->json([
        'message' => 'Flight updated successfully',
        'flight' => $flight
    ]);
}
    //idk lmao
   // creation d'une flight 
    public function creer_flight(Request $request)
{
    try {
        // ✅ Log the incoming request for debugging
        Log::info('Create flight request data:', $request->all());

        // ✅ Validate the request
        $validated = $request->validate([
            'origin'        => 'required|string',
            'destination'   => 'required|string|different:origin',
            'temps_aller'   => 'required|date',
            'temps_arriver' => 'required|date|after:temps_aller',
            'places_business_economy' => 'required|integer|min:0|max:150',
            'places_business_classe' => 'required|integer|min:0|max:30',
            'price'         => 'required|numeric|min:0',
            'status'        => 'required|in:scheduled,arrived',
            
        ]);

        // ✅ Attempt to create the flight
        $flight = Flight::create($validated);

        // ✅ Log the successful creation
        Log::info('Flight created successfully', ['flight' => $flight]);

        return response()->json([
            'message' => 'Flight created successfully',
            'flight'  => $flight
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Return validation errors
        Log::warning('Validation failed for flight creation', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation error',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        // Catch all other errors (DB connection, foreign key, etc.)
        Log::error('Flight creation failed', ['exception' => $e->getMessage()]);
        return response()->json([
            'message' => 'Failed to create flight',
            'error'   => $e->getMessage()
        ], 500);
    }
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

public function searchFlights(Request $request)
{
    //verifier si l'origin n'est pas la destination
    $request->validate([
        'coming_from' => 'required|string',
        'going_to'    => 'required|string',
    ]);
    //filtrer les vols
    $flights = Flight::where('origin', $request->coming_from)->where('destination', $request->going_to)->where('temps_aller', '>=', $request->check_in)->where('status', 'scheduled')->get();
    //si aucune vol n'était sélectionné 
    if ($flights->isEmpty()) {
        return response()->json([
            'message' => 'No flights available for the selected route.',
            'flights' => []
        ], 404);  
    }
    //sinon l'envoi d'une reponse JSON
    return response()->json([
        'flights' => $flights
    ]);
}


}
