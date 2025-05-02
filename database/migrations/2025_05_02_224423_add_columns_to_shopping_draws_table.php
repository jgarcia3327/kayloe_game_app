<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\ShoppingItem;
use App\Models\ShoppingTicket;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('shopping_draws', function (Blueprint $table) {
            $table->foreignIdFor(ShoppingItem::class)->after('id');
            $table->foreignIdFor(ShoppingTicket::class)->after('shopping_item_id');
            $table->boolean('is_active')->nullable()->default(false)->after('shopping_ticket_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shopping_draws', function (Blueprint $table) {
            //
        });
    }
};
