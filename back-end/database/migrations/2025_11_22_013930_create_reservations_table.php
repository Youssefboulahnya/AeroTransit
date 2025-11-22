<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
{
    Schema::create('reservations', function (Blueprint $table) {
        $table->bigIncrements('reservation_ID');

        // Flight linked to this reservation
        $table->unsignedBigInteger('ID_flight');

        // User inputs
        $table->string('coming_from');
        $table->string('going_to');
        $table->date('check_in');
        $table->date('check_out');
        $table->integer('passenger_nbr')->unsigned();
        $table->enum('class', ['economy', 'business', 'first']);
        $table->string('email'); 

        $table->timestamps();

        // Foreign key
        $table->foreign('ID_flight')->references('ID_flight')->on('flights')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
