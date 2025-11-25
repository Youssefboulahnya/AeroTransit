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
        'created_by', // foreign key to Admin
    ];

    // If you don't want Laravel to auto-manage timestamps (created_at, updated_at)
    public $timestamps = true; // or false if you don't have those columns

     protected $appends = ['seats'];


      public function getSeatsAttribute()
    {
        return $this->places_business_classe + $this->places_business_economy;
    }
}
