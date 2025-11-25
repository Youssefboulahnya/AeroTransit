<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory; // <--- ADD THIS
    

    protected $table = 'admins';

    // Tell Laravel the primary key is ID_admin
    protected $primaryKey = 'ID_admin';

    protected $fillable = [
        'email',
        'password',
    ];

    // Disable timestamps if you don't have created_at / updated_at
    public $timestamps = false;
}
