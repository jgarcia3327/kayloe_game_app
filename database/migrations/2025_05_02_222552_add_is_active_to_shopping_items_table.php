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
            $table->dateTime('draw_date')->nullable()->default(null)->after('item_price');
            $table->boolean('is_active')->nullable()->default(false)->after('draw_date');
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
