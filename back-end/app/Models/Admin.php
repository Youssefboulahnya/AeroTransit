<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory; 
    

    protected $table = 'admins';

    // cle primaire 
    protected $primaryKey = 'ID_admin';

    protected $fillable = [
        'email',
        'password',
    ];

    
    public $timestamps = false;
}
