<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $primaryKey = 'ticket_serial_number';
    public $incrementing = false; // since serial number is not auto-increment if that's the case
    protected $keyType = 'string'; // change to 'int' if needed

    protected $fillable = [
        'ticket_serial_number',
        'reservation_ID',
        'Flight_ID',
        'prix',
        'classe',
        
    ];
    // tickets --- passengers
    public function passenger()
    {
        return $this->hasOne(Passenger::class, 'ticket_serial_number', 'ticket_serial_number');
    }
    // tickets --- flights
    public function flight()
    {
        return $this->belongsTo(Flight::class, 'Flight_ID', 'ID_flight');
    }
}
