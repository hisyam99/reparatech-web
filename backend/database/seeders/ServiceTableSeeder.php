<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $services = [
            [
                'nama_jasa' => 'Laptop',
                'gambar' => 'laptop.png',
                'perkiraan_harga' => '1000000',
                'kategori_id' => 1,
                'estimasi' => 3,
            ],
            [
                'nama_jasa' => 'Smartphone',
                'gambar' => 'smartphone.png',
                'perkiraan_harga' => '2000000',
                'kategori_id' => 2,
                'estimasi' => 6,
            ],
            [
                'nama_jasa' => 'Tablet',
                'gambar' => 'tablet.png',
                'perkiraan_harga' => '5000000',
                'kategori_id' => 3,
                'estimasi' => 12,
            ],
        ];

        foreach ($services as $service) {
            Service::factory()->create($service);
        }
    }
}
