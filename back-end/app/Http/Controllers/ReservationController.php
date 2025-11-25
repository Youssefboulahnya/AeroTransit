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
    $reservation->flight_id = $request->flight_id;
    $reservation->save();

    return response()->json([
        'message' => 'Flight assigned successfully',
        'reservation' => $reservation
    ]);
}

}
