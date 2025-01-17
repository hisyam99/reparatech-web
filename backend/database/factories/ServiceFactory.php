<?php

// File: /database/factories/ServiceFactory.php
namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * The current kategori_id being used by the factory.
     */
    protected static ?int $kategori_id;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_jasa' => fake()->word(),
            'image' => fake()->word() . '.png',
            'perkiraan_harga' => fake()->numberBetween(100000, 10000000),
            'kategori_id' => self::$kategori_id ??= fake()->numberBetween(1, 3),
            'estimasi' => fake()->numberBetween(1, 100),
        ];
    }
}
