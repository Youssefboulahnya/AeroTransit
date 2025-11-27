<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations'; // optional if table name follows Laravel convention
    protected $primaryKey = 'reservation_ID'; // set primary key

    protected $fillable = [
        'ID_flight',
        'coming_from',
        'going_to',
        'check_in',
        'passenger_nbr',
        'class',
        'email',
        // if you want to link to a flight
    ];

    // Optional: relation to Flight
    public function flight()
    {
        return $this->belongsTo(\App\Models\Flight::class, 'ID_flight', 'ID_flight');
    }
    //relation reservations --- tickets
    public function tickets()
{
    return $this->hasMany(Ticket::class, 'reservation_ID', 'reservation_ID');
}
// Reservation.php
public function passengers()
{
    return $this->hasMany(Passenger::class, 'reservation_ID', 'reservation_ID');
}

public function payment()
{
    return $this->hasOne(Payment::class, 'reservation_ID', 'reservation_ID');
}




    public function estComplete(): bool
    {
        return $this->coming_from !== null
            && $this->going_to !== null
            && $this->check_in !== null
            && $this->passengers_nb !== null
            && $this->classe !== null
            && $this->flight_id !== null;
    }

     public function total_passenger(): int
    {
        return $this->passengers_nb ?? 0;
    }

    public static function total_passengers_all(): int
    {
        return self::sum('passenger_nbr');
    }
}
