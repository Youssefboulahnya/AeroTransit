<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('tickets', function (Blueprint $table) {
        // 1️⃣ Add the Flight_ID column first
        $table->unsignedBigInteger('Flight_ID');

        // 2️⃣ Then add the foreign key constraint
        $table->foreign('Flight_ID')
              ->references('ID_flight')
              ->on('flights')
              ->onDelete('cascade');
    });
}


public function down()
{
    Schema::table('tickets', function (Blueprint $table) {
        $table->dropForeign(['Flight_ID']);
    });
}

};
