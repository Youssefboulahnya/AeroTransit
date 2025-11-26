<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('passengers', function (Blueprint $table) {

            // Add new columns
            $table->string('Passport_ID')->after('ticket_serial_number');
            $table->string('first_name')->after('Passport_ID');
            $table->string('last_name')->after('first_name');
            

            
            
        });
    }

    public function down(): void
    {
        Schema::table('passengers', function (Blueprint $table) {

            // Remove added columns
            $table->dropColumn(['first_name', 'last_name', 'Passport_ID']);

            
        });
    }
};
