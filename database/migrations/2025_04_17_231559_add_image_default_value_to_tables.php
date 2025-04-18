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
        Schema::table('games', function (Blueprint $table) {
            $table->string('image')->nullable()->default(null)->change();
        });
        Schema::table('questions', function (Blueprint $table) {
            $table->string('image')->nullable()->default(null)->change();
        });
        Schema::table('choices', function (Blueprint $table) {
            $table->string('image')->nullable()->default(null)->change();
        });
        Schema::table('played_games', function (Blueprint $table) {
            $table->string('image')->nullable()->default(null)->change();
        });
        Schema::table('played_questions', function (Blueprint $table) {
            $table->string('image')->nullable()->default(null)->change();
        });
        Schema::table('played_choices', function (Blueprint $table) {
            $table->string('image')->nullable()->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tables', function (Blueprint $table) {
            //
        });
    }
};
