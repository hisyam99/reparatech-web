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
            ],
            [
                'name' => 'Smartphone',
            ],
            [
                'name' => 'Tablet',
            ],
        ];

        foreach ($categories as $category) {
            Category::factory()->create($category);
        }
    }
}
