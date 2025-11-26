<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
class ReservationController extends Controller
{
    public function store_reservation(Request $request)
{
    $validated = $request->validate([
        'coming_from'    => 'required|string',
        'going_to'       => 'required|string|different:coming_from',
        'check_in'       => 'required|date',
        'passenger_nbr' => 'required|integer|min:1',
        'class'         => 'required|in:business,economy',
        

    ]);

    $reservation = Reservation::create($validated);

    return response()->json([
        'message' => 'Reservation created successfully',
        'reservation' => $reservation
    ], 201);
}

public function choisir_Flight(Request $request, $reservation_id)
{
    $request->validate([
        'ID_flight' => 'required|exists:flights,ID_flight',
    ]);

    $reservation = Reservation::findOrFail($reservation_id);
    $reservation->ID_flight = $request->ID_flight;
    $reservation->save();

    return response()->json([
        'message' => 'Flight assigned successfully',
        'reservation' => $reservation
    ]);
}



public function getFlightDetails($reservationId)
{
    // Find the reservation
    $reservation = Reservation::with('flight')->findOrFail($reservationId);

    // If there is no flight assigned yet
    if (!$reservation->ID_flight || !$reservation->flight) {
        return response()->json([
            'message' => 'No flight assigned to this reservation yet.'
        ], 404);
    }

    $flight = $reservation->flight;

    return response()->json([
        'flight' => [
            'origin'        => $flight->origin,
            'destination'   => $flight->destination,
            'temps_aller'   => $flight->temps_aller,
            'temps_arriver' => $flight->temps_arriver,
            'price'         => $flight->price,
        ],
        'reservation' => [
            'class'         => $reservation->class,
            'passenger_nbr' => $reservation->passenger_nbr,
            'reservation_id'=> $reservation->reservation_ID,
        ]
    ]);
}

public function updateEmail(Request $request, $reservation_ID)
{
    $request->validate([
        'email' => 'required|email'
    ]);

    $reservation = Reservation::findOrFail($reservation_ID);
    $reservation->email = $request->email;
    $reservation->save();

    return response()->json([
        'message' => 'Email updated successfully.',
        'reservation' => $reservation
    ]);
}

}
