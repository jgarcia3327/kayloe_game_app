<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingItem extends Model
{
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shoppingImages(): HasMany
    {
        return $this->hasMany(ShoppingImage::class);
    }

    public function shoppingTickets(): HasMany
    {
        return $this->hasMany(ShoppingTicket::class);
    }

    public function shoppingDraws(): HasMany
    {
        return $this->hasMany(ShoppingDraw::class);
    }
}
