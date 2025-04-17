<?php

use App\Models\Choice;
use App\Models\PlayedQuestion;
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
        Schema::create('played_choices', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(PlayedQuestion::class);
            $table->string('description');
            $table->string('image');
            $table->foreignIdFor(Choice::class);
            $table->boolean('is_answer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('played_choices');
    }
};
