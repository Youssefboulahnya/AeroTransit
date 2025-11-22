<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('passengers', function (Blueprint $table) {
            $table->bigIncrements('Passagère_ID'); // Primary key

            // Foreign keys
            $table->unsignedBigInteger('reservation_ID'); // Linked reservation
            $table->unsignedBigInteger('Flight_ID');      // Linked flight
            $table->unsignedBigInteger('ticket_serial_number'); // Linked ticket

            // Passenger details
            $table->enum('type', ['adult', 'child']); // age category
            $table->integer('Numero_place');          // seat number

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('reservation_ID')->references('reservation_ID')->on('reservations')->onDelete('cascade');

            $table->foreign('Flight_ID')->references('ID_flight')->on('flights')->onDelete('cascade');

            $table->foreign('ticket_serial_number')->references('ticket_serial_number')->on('tickets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passengers');
    }
};
