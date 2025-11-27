<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Passenger;
use App\Models\Payment;
use App\Models\Ticket;
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
        'reservation_ID' => $reservation->reservation_ID,
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


public function getConfirmationData($reservationId)
{
    $reservation = Reservation::find($reservationId);

    if (!$reservation) {
        return response()->json([
            'message' => 'Reservation not found.',
        ], 404);
    }

    return response()->json([
        'email'           => $reservation->email,
        'reservation_ID'  => $reservation->reservation_ID,
    ], 200);
}



// Manage your Booking login page

public function Manage_your_booking_login(Request $request)
{
    $request->validate([
        'email'          => 'required|email',
        'reservation_ID' => 'required|integer',
    ]);

    $reservation = Reservation::where('email', $request->email)->where('reservation_ID', $request->reservation_ID)->first();

    if (!$reservation) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid email or reservation ID.',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Login successful.',
        'reservation' => $reservation,
    ], 200);
}


public function getTickets($reservation_ID)
{
    // Retrieve the reservation along with its tickets, passengers, and flight
    $reservation = Reservation::with(['tickets.passenger', 'flight'])
        ->where('reservation_ID', $reservation_ID)
        ->first();

    if (!$reservation) {
        return response()->json([
            'success' => false,
            'message' => 'Reservation not found.',
        ], 404);
    }

    // Map tickets with passenger info
    $tickets = $reservation->tickets->map(function ($ticket) {
        return [
            'ticket_serial_number' => $ticket->ticket_serial_number,
            'classe'               => $ticket->classe,
            'prix'                 => $ticket->prix,
            'passenger_first_name' => $ticket->passenger->first_name ?? null,
            'passenger_last_name'  => $ticket->passenger->last_name ?? null,
            'passenger_type'       => $ticket->passenger->type ?? null,
            'passport_ID'          => $ticket->passenger->Passport_ID ?? null,
            'seat_number'          => $ticket->passenger->Numero_place ?? null,
        ];
    });

    // Include flight info
    $flightInfo = $reservation->flight ? [
        'ID_flight'     => $reservation->flight->ID_flight,
        'company'       => $reservation->flight->company,
        'origin'        => $reservation->flight->origin,
        'destination'   => $reservation->flight->destination,
        'temps_aller'     => $reservation->flight->temps_aller,
        'temps_arriver'       => $reservation->flight->temps_arriver,
        'price'         => $reservation->flight->price,
    ] : null;

    return response()->json([
        'success' => true,
        'reservation_ID' => $reservation->reservation_ID,
        'tickets' => $tickets,
        'flight'  => $flightInfo,
    ]);
}


public function updatePassengerInfo(Request $request, $ticketSerial)
{
    // Validate input
    $validated = $request->validate([
        'first_name'  => 'required|string|max:255',
        'last_name'   => 'required|string|max:255',
        'passport_ID' => 'required|string|max:50',
    ]);

    // Find passenger linked to the ticket
    $passenger = Passenger::where('ticket_serial_number', $ticketSerial)->first();

    if (!$passenger) {
        return response()->json([
            'success' => false,
            'message' => 'Passenger not found.',
        ], 404);
    }

    // Update the passenger's info
    $passenger->first_name  = $validated['first_name'];
    $passenger->last_name   = $validated['last_name'];
    $passenger->Passport_ID = $validated['passport_ID'];
    $passenger->save();

    return response()->json([
        'success'   => true,
        'message'   => 'Passenger information updated successfully.',
        'passenger' => $passenger
    ], 200);
}


// button do delete reservation
public function deleteReservation($reservationId)
{
    
    $reservation = Reservation::with(['passengers', 'tickets', 'payment'])->where('reservation_ID', $reservationId)->first();

    if (!$reservation) {
        return response()->json([
            'success' => false,
            'message' => 'Reservation not found.',
        ], 404);
    }

    // Delete related tickets
    foreach ($reservation->tickets as $ticket) {
        $ticket->delete();
    }

    // Delete related passengers
    foreach ($reservation->passengers as $passenger) {
        $passenger->delete();
    }

    // Delete related payment (if exists)
    if ($reservation->payment) {
        $reservation->payment->delete();
    }

    // Finally, delete the reservation itself
    $reservation->delete();

    return response()->json([
        'success' => true,
        'message' => 'Reservation and all related data deleted successfully.',
    ]);
}


public function deleteTicket($ticketSerialNumber)
{
    // Find the ticket
    $ticket = Ticket::where('ticket_serial_number', $ticketSerialNumber)->first();

    if (!$ticket) {
        return response()->json([
            'success' => false,
            'message' => 'Ticket not found.'
        ], 404);
    }

    // Find the passenger related to this ticket
    $passenger = Passenger::where('ticket_serial_number', $ticketSerialNumber)->first();

    if ($passenger) {
        $passenger->delete();
    }

    $reservationId = $ticket->reservation_ID;

    // Delete the ticket
    $ticket->delete();

    // Update reservation passenger_nbr
    $reservation = Reservation::find($reservationId);
    if ($reservation) {
        $reservation->passenger_nbr = max(0, $reservation->passenger_nbr - 1);
        $reservation->save();
    }

    // Update payment prix_total
    $payment = Payment::where('reservation_ID', $reservationId)->first();
    if ($payment) {
        $remainingTickets = Ticket::where('reservation_ID', $reservationId)->get();
        $totalPrice = $remainingTickets->sum('prix'); // Sum of remaining ticket prices
        $payment->prix_total = $totalPrice;
        $payment->save();
    }

    return response()->json([
        'success' => true,
        'message' => 'Ticket deleted successfully and totals updated.'
    ]);
}




}
