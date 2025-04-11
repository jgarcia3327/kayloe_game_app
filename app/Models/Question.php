<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    protected $guarded = [];
    
    protected function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
