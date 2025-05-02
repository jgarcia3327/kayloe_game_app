<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\Request;

class ShoppingItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Shopping/Home', [
            //
        ]);
    }
}
