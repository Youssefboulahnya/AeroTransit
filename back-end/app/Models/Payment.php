<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $primaryKey = 'payment_ID';

    protected $fillable = [
        'reservation_ID',
        'prix_total',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservation_ID', 'reservation_ID');
    }
}
