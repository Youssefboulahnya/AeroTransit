<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Reservation;
use App\Models\Flight;
use Illuminate\Http\Request;
use App\Models\Ticket;

class PassengerController extends Controller
{
    public function storePassengers(Request $request)
{
    $reservation_ID = $request->reservation_ID;
    $Flight_ID      = $request->Flight_ID;
    $passengers     = $request->passengers;

    
    $reservation = Reservation::findOrFail($reservation_ID);
    $flight      = Flight::findOrFail($Flight_ID);

    $created = [];

    foreach ($passengers as $p) {

    // 1. Validate seat not taken
    $seatTaken = Passenger::where('Flight_ID', $Flight_ID)
                          ->where('Numero_place', $p['Numero_place'])
                          ->exists();

    if ($seatTaken) {
        return response()->json([
            'error' => "Seat {$p['Numero_place']} is already reserved."
        ], 422);
    }

    // 2. Validate class seat range
    $seat = $p['Numero_place'];
    $businessMax = $flight->places_business_classe;
    $economyStart = $businessMax + 1;
    $economyEnd = $businessMax + $flight->places_economy_classe;;

    if ($reservation->class === 'business') {
        if ($seat < 1 || $seat > $businessMax) {
            return response()->json([
                'error' => "Seat $seat invalid for Business class. Allowed: 1 to $businessMax."
            ], 422);
        }
    }

    if ($reservation->class === 'economy') {
        if ($seat < $economyStart || $seat > $economyEnd) {
            return response()->json([
                'error' => "Seat $seat invalid for Economy. Allowed: $economyStart to $economyEnd."
            ], 422);
        }
    }

    // 3. Generate ticket serial
    $ticketSerial = $this->generateTicketNumber();

    // 4. Create passenger
    $passenger = Passenger::create([
        'reservation_ID'       => $reservation_ID,
        'Flight_ID'            => $Flight_ID,
        'ticket_serial_number' => $ticketSerial,
        'first_name'           => $p['first_name'],
        'last_name'            => $p['last_name'],
        'Passport_ID'          => $p['Passport_ID'],
        'type'                 => $p['type'],
        'Numero_place'         => $seat,
    ]);

    // 5. Create corresponding ticket here
    Ticket::create([
        'ticket_serial_number' => $ticketSerial,
        'Flight_ID'            => $Flight_ID,
        'Passenger_ID'         => $passenger->id,
        'price'                => $passenger->calculer_prix(), 
    ]);
}


    return response()->json($created, 201);
}
    /**
     * Generate a unique random ticket_serial_number.
     */
    private function generateTicketNumber()
{
    do {
        $number = random_int(1000000000, 9999999999); // 10-digit random
    } while (Passenger::where('ticket_serial_number', $number)->exists());

    return $number;
}
}
