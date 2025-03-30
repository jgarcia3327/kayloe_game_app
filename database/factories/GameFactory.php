<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => rand(11111, 99999),
            'user_id' => rand(1, 10),
            'title' => ('Game' . fake()->name()),
            'description' => ('Game description ' . Str::random(100)),
            'image' => 'https://cebushopping.com/author/images/illustrations/hello3.svg'
        ];
    }
}
