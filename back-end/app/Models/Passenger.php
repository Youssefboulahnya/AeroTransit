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

    // Relations
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


    //savoir le type d'un passager
    public function type(): string
    {
        return $this->type; 
        
    }


    public function calculer_prix(): float
{
    // savoir si le ticket exist
    if (!$this->ticket || !$this->ticket->flight) {
        return 0.0;
    }

    $basePrice = (float) $this->ticket->flight->price;
    $finalPrice = $basePrice;

    

        // calculons les offres en se basant sur les classes reserve
        if ($this->ticket->classe === 'business' && $this->type === 'adult') {
            $finalPrice += $finalPrice * 0.15;
        } elseif ($this->ticket->classe === 'economy' && $this->type === 'adult') {
            $finalPrice += $finalPrice * 0.05;
        }
        else {
        // children pay le prix du vol
        $finalPrice = $basePrice;
    }

    // Save the calculated price in the ticket
    $this->ticket->prix = $finalPrice;
    $this->ticket->save();

    return $finalPrice;
}



}
