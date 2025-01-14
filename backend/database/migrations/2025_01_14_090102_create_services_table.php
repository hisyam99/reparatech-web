<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jasa');  // Nama layanan
            $table->string('gambar');  // Gambar layanan
            $table->decimal('perkiraan_harga', 8, 2);  // Harga perkiraan layanan
            $table->foreignId('kategori_id')->constrained('categories')->onDelete('cascade');  // ID kategori layanan dengan relasi yang benar            $table->integer('estimasi');  // Estimasi waktu penyelesaian layanan (dalam jam)
            $table->integer('estimasi');  // Estimasi waktu penyelesaian layanan (dalam jam)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
