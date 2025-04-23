<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayedChoice extends Model
{
    protected $guarded = [];

    public function playedQuestion(): BelongsTo
    {
        return $this->belongsTo(playedQuestion::class);
    }

    public function choice(): BelongsTo
    {
        return $this->belongsTo(Choice::class);
    }
}
