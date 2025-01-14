<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Laptop',
                'image' => 'laptop.png',
            ],
            [
                'name' => 'Smartphone',
                'image' => 'smartphone.png',
            ],
            [
                'name' => 'Tablet',
                'image' => 'tablet.png',
            ],
            [
                'name' => 'Aksesoris',
                'image' => 'aksesoris.png',
            ],
        ];

        foreach ($categories as $category) {
            Category::factory()->create($category);
        }
    }
}
