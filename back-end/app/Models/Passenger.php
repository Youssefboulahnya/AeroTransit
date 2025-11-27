<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Ticket; 
class Passenger extends Model
{
    protected $table = 'passengers';
    protected $primaryKey = 'Passagère_ID';
    public $incrementing = true;

    protected $fillable = [
        'reservation_ID',
        'Flight_ID',
        'ticket_serial_number',
        'first_name',
        'last_name',
        'Passport_ID',
        'type',
        'Numero_place',
    ];

    // Relationships
    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservation_ID', 'reservation_ID');
    }

    public function flight()
    {
        return $this->belongsTo(Flight::class, 'Flight_ID', 'ID_flight');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_serial_number', 'ticket_serial_number');
    }


    //methode retourn le type d'un passager
    public function type(): string
    {
        return $this->type; 
        
    }


    public function calculer_prix(): float
{
    // Make sure the ticket and flight exist
    if (!$this->ticket || !$this->ticket->flight) {
        return 0.0;
    }

    $basePrice = (float) $this->ticket->flight->price;
    $finalPrice = $basePrice;

    // 
    if ($this->type === 'adult') {
        // Base adult markup: 50% of base price
        $finalPrice = $basePrice + ($basePrice * 0.5);

        // Extra depending on ticket class
        if ($this->ticket->classe === 'business') {
            $finalPrice += $finalPrice * 0.15;
        } elseif ($this->ticket->classe === 'economy') {
            $finalPrice += $finalPrice * 0.05;
        }
    } elseif ($this->type === 'child') {
        // Children always pay base price
        $finalPrice = $basePrice;
    }

    // Save the calculated price in the ticket
    $this->ticket->prix = $finalPrice;
    $this->ticket->save();

    return $finalPrice;
}



}
