<?php

namespace App\Http\Controllers;

use App\Models\ShoppingItem;
use App\Models\ShoppingTicket;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ShoppingTicketController extends Controller
{
    public function buyTicket(ShoppingItem $shoppingItem): void
    {
        // Check if we have available ticket from the shopping item
        $ticketCount = ShoppingTicket::where('shopping_item_id', $shoppingItem->id)->count();
        if ($shoppingItem->ticket_count > $ticketCount) {
            // Add ticket
            ShoppingTicket::create([
                'uuid' => Str::uuid()->toString(),
                'shopping_item_id' => $shoppingItem->id,
                'user_id' => Auth::user()->id,
                'is_active' => true
            ]);
        }
    }
}