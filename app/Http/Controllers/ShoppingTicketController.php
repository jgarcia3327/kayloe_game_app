<?php

namespace App\Http\Controllers;

use App\Models\ShoppingDraw;
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

        // Draw
        if($shoppingItem->draw_option === 0 && $shoppingItem->ticket_count === ShoppingTicket::where('shopping_item_id', $shoppingItem->id)->count()) {
            $this->startDraw($shoppingItem);
        }
    }

    public function startDraw($shoppingItem) {

        $winningTicket = ShoppingTicket::select('id')->where('shopping_item_id', $shoppingItem->id)->inRandomOrder()->first();

        ShoppingDraw::create([
            'shopping_item_id' => $shoppingItem->id,
            'shopping_ticket_id' => $winningTicket->id,
            'is_active' => true
        ]);

        // TODO redirect to draw ticket
    }
}