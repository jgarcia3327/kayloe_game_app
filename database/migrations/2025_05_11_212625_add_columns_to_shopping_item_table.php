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
        Schema::table('shopping_items', function (Blueprint $table) {
            $table->dateTime('expire_date')->nullable()->after('draw_date');
            $table->tinyInteger('draw_option')->comment('0=draw once ticket sold out, 1=draw on draw_date')->after('expire_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shopping_items', function (Blueprint $table) {
            //
        });
    }
};
