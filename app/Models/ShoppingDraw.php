<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingDraw extends Model
{
    protected $guarded = [];

    public function shoppingItem(): BelongsTo
    {
        return $this->belongsTo(ShoppingItem::class);
    }

    public function shoppingTicket(): BelongsTo
    {
        return $this->belongsTo(ShoppingTicket::class);
    }
}
