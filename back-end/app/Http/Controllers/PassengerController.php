<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use Illuminate\Http\Request;
use App\Models\Ticket;

class PassengerController extends Controller
{
    public function storePassengers(Request $request)
{
    $reservation_ID = $request->reservation_ID;
    $Flight_ID = $request->Flight_ID;
    $passengersData = $request->passengers; // array of passengers

    $createdPassengers = [];

    foreach ($passengersData as $p) {
        // generate unique ticket number
        $ticketSerial = $this->generateTicketNumber();

        // create passenger
        $passenger = Passenger::create([
            'reservation_ID'      => $reservation_ID,
            'Flight_ID'           => $Flight_ID,
            'ticket_serial_number'=> $ticketSerial,
            'first_name'          => $p['first_name'],
            'last_name'           => $p['last_name'],
            'Passport_ID'         => $p['Passport_ID'],
            'type'                => $p['type'],
            'Numero_place'        => $p['Numero_place'] ?? null,
        ]);

        // calculate ticket price based on passenger type
        $price = $passenger->type === 'child'
            ? $passenger->flight->price
            : $passenger->flight->price + 30;

        // create ticket
        Ticket::create([
            'ticket_serial_number' => $ticketSerial,
            'Passenger_ID'         => $passenger->Passagère_ID,
            'Flight_ID'            => $Flight_ID,
            'price'                => $price,
        ]);

        $createdPassengers[] = $passenger;
    }

    return response()->json([
        'message' => 'Passengers and tickets created successfully.',
        'passengers' => $createdPassengers,
    ]);
}


    /**
     * Generate a unique random ticket serial number.
     */
    private function generateTicketNumber()
{
    do {
        $number = random_int(1000000000, 9999999999); // 10-digit random
    } while (Passenger::where('ticket_serial_number', $number)->exists());

    return $number;
}
}
