<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            // Make ID_flight nullable
            $table->unsignedBigInteger('ID_flight')->nullable()->change();
            
            // Make email nullable
            $table->string('email')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            // Revert changes if rollback
            $table->unsignedBigInteger('ID_flight')->nullable(false)->change();
            $table->string('email')->nullable(false)->change();
        });
    }
};
