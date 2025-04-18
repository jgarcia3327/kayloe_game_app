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
        Schema::table('played_games', function (Blueprint $table) {
            $table->tinyInteger('passing_percent')->default(100)->after('image');
            $table->integer('time_in_sec')->default(0)->after('passing_percent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('played_games', function (Blueprint $table) {
            //
        });
    }
};
