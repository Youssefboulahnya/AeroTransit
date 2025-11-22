<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('payments', function (Blueprint $table) {
        $table->bigIncrements('payment_ID'); // Primary key

        // Foreign key to the reservation
        $table->unsignedBigInteger('reservation_ID');

        // Payment details
        $table->decimal('prix_total', 8, 2);

        $table->timestamps();

        // Foreign key constraint
        $table->foreign('reservation_ID')->references('reservation_ID')->on('reservations')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
