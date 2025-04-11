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
        Schema::table('questions', function(Blueprint $table) {
            $table->integer('correct_percent')->after('image')->change();
        });

        Schema::table('choices', function(Blueprint $table) {
            $table->boolean('is_correct')->after('image')->change();
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
