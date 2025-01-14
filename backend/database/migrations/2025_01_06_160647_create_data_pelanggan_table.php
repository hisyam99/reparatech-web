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
        Schema::create('data_pelanggan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nomor_hp');
            $table->string('email');
            $table->enum('jenis_pengiriman', ['antar-jemput', 'datang-lokasi']);
            $table->text('informasi');
            $table->text('alamat');
            $table->string('gambar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_pelanggans');
    }
};
