<?php

use App\Models\PlayedGame;
use App\Models\Question;
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
        Schema::create('played_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(PlayedGame::class);
            $table->string('question');
            $table->string('image');
            $table->foreignIdFor(Question::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('played_questions');
    }
};
