<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class MainController extends Controller
{

    public function home() : Response
    {
        return Inertia::render('Home', [
            //
        ]);
    }
}
