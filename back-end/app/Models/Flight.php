<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    // Specify the primary key if it's not the default 'id'
    protected $primaryKey = 'ID_flight';

    // The attributes that are mass assignable
    protected $fillable = [
        'origin',
        'destination',
        'temps_aller',
        'temps_arriver',
        'places_business_classe',
        'places_business_economy',
        'price',
        'status',
        
    ];

    // If you don't want Laravel to auto-manage timestamps (created_at, updated_at)
    public $timestamps = true; // or false if you don't have those columns

     protected $appends = ['seats'];


      public function getSeatsAttribute()
    {
        return $this->places_business_classe + $this->places_business_economy;
    }


    public function places_disponible(): int
    {
        $reserved = $this->reservations()->sum('passenger_nbr'); // sum of all passengers already reserved
        return $this->places_total() - $reserved;
    }

    public function places_disponible_par_classe(string $class): int
{
    // Number of passengers already reserved in this class
    $reserved = $this->reservations()
                     ->where('class', strtolower($class))
                     ->sum('passenger_nbr');

    if (strtolower($class) === 'business') {
        return $this->places_business_classe - $reserved;
    }

    if (strtolower($class) === 'economy') {
        return $this->places_business_economy - $reserved;
    }

    // If class string is wrong, return 0


    
    return 0;
}


//relation flights --- reservations

public function reservations()
{
    return $this->hasMany(\App\Models\Reservation::class, 'ID_flight', 'ID_flight');
}



}
