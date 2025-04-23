<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayedQuestion extends Model
{
    protected $guarded = [];

    public function playedGame(): BelongsTo
    {
        return $this->belongsTo(playedGame::class);
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}
