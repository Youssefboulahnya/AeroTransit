<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Ticket;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        $request->validate([
            'reservation_ID' => 'required|integer|exists:reservations,reservation_ID'
        ]);

        $reservation_ID = $request->reservation_ID;

        // 1️⃣ Collect all tickets for this reservation
        $tickets = Ticket::where('reservation_ID', $reservation_ID)->get();

        if ($tickets->isEmpty()) {
            return response()->json([
                'error' => 'No tickets found for this reservation.'
            ], 404);
        }

        // calculer prix_total
        $prix_total = $tickets->sum('prix');

        // Inserer une ligne dans le tableau payments
        $payment = Payment::create([
            'reservation_ID' => $reservation_ID,
            'prix_total'     => $prix_total,
        ]);

       
        return response()->json([
            'payment_ID'     => $payment->payment_ID,
            'reservation_ID' => $reservation_ID,
            'prix_total'     => $prix_total,
        ], 201);
    }
}
