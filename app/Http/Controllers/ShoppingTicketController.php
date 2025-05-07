<?php

namespace App\Http\Controllers;

use App\Models\ShoppingItem;
use Illuminate\Http\Request;

class ShoppingTicketController extends Controller
{
    public function buyTicket(ShoppingItem $shoppingItem): void
    {
        // TODO: Check if ticket still available
        dd($shoppingItem);
    }
}
