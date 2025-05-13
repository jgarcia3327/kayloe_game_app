<?php

namespace App\Http\Controllers;

use App\Models\ShoppingImage;
use App\Models\ShoppingItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ShoppingItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Shopping/Home', [
            //
        ]);
    }

    public function all(): Response
    {
        $shoppingItems = ShoppingItem::where('is_active', 1)->with(['shoppingImages', 'shoppingTickets'])->get();
        return Inertia::render('Shopping/All', [
            'shoppingItems' => $shoppingItems,
        ]);
    }

    public function myList(): Response
    {
        $shoppingItems = ShoppingItem::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Shopping/MyList', [
            'shoppingItems' => $shoppingItems,
        ]);
    }

    public function view(ShoppingItem $shoppingItem): Response
    {
        return Inertia::render('Shopping/View', [
            'shoppingItem' => $this->getShoppingItemWithImages($shoppingItem->id, false)
        ]);
    }

    public function create()
    {
        if (!Auth::check())
            return redirect()->route('home');

        return Inertia::render('Shopping/Create');
    }

    public function store(Request $request)
    {
        $shoppingItem = ShoppingItem::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::user()->id,
            'ticket_count' => $request->ticket_count,
            'ticket_price' => $request->ticket_price,
            'item_price' => $request->item_price,
            'is_deleted' => false
        ]);
        
        return redirect()->route('shopping.edit', $shoppingItem->id);
    }

    public function edit(ShoppingItem $shoppingItem): Response
    {
        return Inertia::render('Shopping/Edit', [
            'shoppingItem' => $this->getShoppingItemWithImages($shoppingItem->id, true)
        ]);

    }

    public function update(ShoppingItem $shoppingItem, Request $request): void
    {
        // dd($request);
        if ($shoppingItem->user_id === Auth::user()->id) {
            $shoppingItem->update([
                'title' => $request->title,
                'description' => $request->description,
                'ticket_count' => $request->ticket_count,
                'ticket_price' => $request->ticket_price,
                'item_price' => $request->item_price,
                'draw_date' => $request->draw_date,
                'expire_date' => $request->expire_date,
                'draw_option' => $request->draw_option,
                'is_active' => $request->is_active
            ]);
        }
    }

    public function delete(ShoppingItem $shoppingItem) : Response
    {

        if ($shoppingItem->user_id === Auth::user()->id) {
            // Set to in-active
            $shoppingItem->update([
                'is_deleted' => true
            ]);
            // FIXME do we really need to delete DB entry?
            // $shoppingItem->delete();
        }

        // FIXME redirect to more specific page
        return Inertia::render('Dashboard');
    }

    public function storeImage(Request $request, ShoppingItem $shoppingItem) : void
    {
        // Save file
        $file = $request->file('image');
        $ext = $file->getClientOriginalExtension();
        $name = $shoppingItem->id . '_' . time() . '.' . $ext;
        $filename = $file->storeAs($name, ['disk' => 'public_shopping_image']);

        // Store $filename to DB
        ShoppingImage::create([
            'user_id' => Auth::user()->id,
            'shopping_item_id' => $shoppingItem->id,
            'name' => $filename,
            'is_active' => true
        ]);
    }

    public function deleteImage(ShoppingImage $shoppingImage) : void
    {
        // Delete file
        if (!empty($shoppingImage->name)) {
            Storage::disk('public_shopping_image')->delete($shoppingImage->name);
            // Update DB
            $shoppingImage->delete();
        }
    }

    private function getShoppingItemWithImages($shoppingItemId, $isOwner) {
        if ($isOwner)
            return ShoppingItem::where('user_id', Auth::user()->id)->where('id', $shoppingItemId)->with(['shoppingImages', 'shoppingTickets'])->first();
        else
            return ShoppingItem::where('is_active', 1)->where('id', $shoppingItemId)->with(['shoppingImages', 'shoppingTickets'])->first();
    }
}
