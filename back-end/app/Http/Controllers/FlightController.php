<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class FlightController extends Controller
{

    public function liste_flight(){
        $flights = Flight::all();
        return response()->json($flights);
    }
    

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
        
        Log::info('Create flight request data:', $request->all());

        
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

        
        $flight = Flight::create($validated);

        
        Log::info('Flight created successfully', ['flight' => $flight]);

        return response()->json([
            'message' => 'Flight created successfully',
            'flight'  => $flight
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        
        Log::warning('Validation failed for flight creation', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation error',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        
        Log::error('Flight creation failed', ['exception' => $e->getMessage()]);
        return response()->json([
            'message' => 'Failed to create flight',
            'error'   => $e->getMessage()
        ], 500);
    }
}



public function delete_flight($id)
{
    // chercher le flight
    $flight = Flight::find($id);

    // si il n'exist pas
    if (!$flight) {
        return response()->json([
            'message' => 'Flight not found'
        ], 404);
    }

    // supprimer le flight

    // JSON response
    return response()->json([
        'message' => 'Flight deleted successfully'
    ], 200);
}



        //partie de selectio du flight par le client
public function searchFlights(Request $request)
{
    
    $request->validate([
        'coming_from'    => 'required|string',
        'going_to'       => 'required|string|different:coming_from',
        'check_in'       => 'required|date',
        'passenger_nbr'  => 'required|integer|min:1',
        'class'          => 'required|in:business,economy',
    ]);

    
    $coming_from   = $request->coming_from;
    $going_to      = $request->going_to;
    $check_in      = $request->check_in;
    $passenger_nbr = $request->passenger_nbr;
    $classe        = strtolower($request->class); // business or economy

    // Filter flights by origin, destination, date, and status
    $flights = Flight::where('origin', $coming_from)
        ->where('destination', $going_to)
        ->where('temps_aller', '>=', $check_in)
        ->where('status', 'scheduled')
        ->get();

    // Filter flights based on available seats in the chosen class
    $flights = $flights->filter(function($flight) use ($passenger_nbr, $classe) {
        return $flight->places_disponible_par_classe($classe) >= $passenger_nbr;
    });

    // Check if no flights match the criteria
    if ($flights->isEmpty()) {
        return response()->json([
            'message' => 'No flights available for the selected route.',
            'flights' => []
        ], 404);  
    }

    // JSON response of the flights list 
    return response()->json([
        'flights' => $flights
    ]);
}


}
