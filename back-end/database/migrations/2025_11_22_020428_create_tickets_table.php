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
    Schema::create('tickets', function (Blueprint $table) {
        $table->bigIncrements('ticket_serial_number'); 

        // Foreign keys
        $table->unsignedBigInteger('reservation_ID'); // linked reservation
        

        // Ticket details
        $table->string('classe');  // economy, business, etc.
        $table->decimal('prix', 8, 2);

        $table->timestamps();

        // Foreign key constraints
        $table->foreign('reservation_ID')->references('reservation_ID')->on('reservations')->onDelete('cascade');

        
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
