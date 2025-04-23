<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $guarded = [];

    public function playedGame(): BelongsTo
    {
        return $this->belongsTo(playedGame::class);
    }
}
