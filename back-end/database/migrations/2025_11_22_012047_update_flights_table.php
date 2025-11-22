<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
{
    Schema::table('flights', function (Blueprint $table) {

        // Rename ID_f → ID_flight
        $table->renameColumn('ID_f', 'ID_flight');

        // Rename columns to match your naming
        $table->renameColumn('Aller', 'origin');
        $table->renameColumn('Destination', 'destination');

        // Modify enums
        $table->enum('status', ['scheduled', 'arrived'])->default('scheduled')->change();

        // Add missing columns
        $table->decimal('price', 8, 2)->after('seats');
        $table->unsignedBigInteger('created_by')->after('price');

        // Add timestamps if needed
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
