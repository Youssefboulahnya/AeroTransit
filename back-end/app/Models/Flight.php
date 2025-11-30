<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    // cle primaire
    protected $primaryKey = 'ID_flight';

    // les attributs
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

   
    public $timestamps = true; 

     protected $appends = ['seats'];


      public function getSeatsAttribute()
    {
        return $this->places_business_classe + $this->places_business_economy;
    }


    public function places_disponible(): int
    {
        $reserved = $this->reservations()->sum('passenger_nbr'); 
        return $this->places_total() - $reserved;
    }

    public function places_disponible_par_classe(string $class): int
{
    // nombre des passageres dans cette classe
    $reserved = $this->reservations()->where('class', strtolower($class))->sum('passenger_nbr');

    if (strtolower($class) === 'business') {
        return $this->places_business_classe - $reserved;
    }

    if (strtolower($class) === 'economy') {
        return $this->places_business_economy - $reserved;
    }


    
    return 0;
}


// flights --- reservations

public function reservations()
{
    return $this->hasMany(\App\Models\Reservation::class, 'ID_flight', 'ID_flight');
}





}
