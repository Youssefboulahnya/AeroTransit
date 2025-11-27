<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Reservation;
use App\Models\Flight;
use Illuminate\Http\Request;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

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

    DB::beginTransaction(); // Start transaction
    try {
        foreach ($passengers as $p) {
            $seat = $p['Numero_place'];
            $businessMax = $flight->places_business_classe;
            $economyStart = $businessMax + 1;
            $economyEnd = $businessMax + $flight->places_business_economy;

            // Validate seat range
            if ($reservation->class === 'business' && ($seat < 1 || $seat > $businessMax)) {
                throw new \Exception("Seat $seat invalid for Business class. Allowed: 1 to $businessMax.");
            }
            if ($reservation->class === 'economy' && ($seat < $economyStart || $seat > $economyEnd)) {
                throw new \Exception("Seat $seat invalid for Economy. Allowed: $economyStart to $economyEnd.");
            }

            // Check if seat taken
            $seatTaken = Passenger::where('Flight_ID', $Flight_ID)
                                  ->where('Numero_place', $seat)
                                  ->exists();
            if ($seatTaken) {
                throw new \Exception("Seat $seat is already reserved.");
            }

            // Create ticket first
            $ticketSerial = $this->generateTicketNumber();
            $ticket = Ticket::create([
                'ticket_serial_number' => $ticketSerial,
                'reservation_ID'       => $reservation_ID,
                'Flight_ID'            => $Flight_ID,  
                'classe'               => $reservation->class,
                'prix'                 => 0, // temp, will calculate later
            ]);

            // Create passenger
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

            // Update ticket with passenger ID and calculate price
            $ticket->passenger_ID = $passenger->Passagère_ID;
            
            

            // Save ticket price
            $ticket->prix = $passenger->calculer_prix();

            $ticket->save();

            $created[] = $passenger;
        }

        DB::commit(); // Everything ok, commit

        return response()->json([
            'message' => 'All passengers created successfully',
            'passengers' => $created
        ], 201);
    } catch (\Exception $e) {
        DB::rollBack(); // Something failed, rollback everything
        return response()->json([
            'error' => $e->getMessage()
        ], 422);
    }
}

    private function generateTicketNumber()
{
    do {
        $number = random_int(1000000000, 9999999999); // 10-digit random
    } while (Passenger::where('ticket_serial_number', $number)->exists());

    return $number;
}
}
