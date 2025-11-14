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
        Schema::create('flights', function (Blueprint $table) {
            $table->id('ID_f');
            $table->string('Aller')->nullable(false);
            $table->string('Destination')->nullable(false);
            $table->dateTime('temps_aller');
            $table->dateTime('temps_arriver');
            $table->integer('seats')->unsigned();
            $table->enum('status', ['not_departed', 'flying', 'arrived'])->default('not_departed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('flights', function (Blueprint $table) {
            //
        });
    }
};