<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('data_pelanggan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('gambar')->nullable();
            $table->string('nomor_hp');
            $table->string('email')->unique();
            $table->enum('jenis_pengiriman', ['Layanan Antar Jemput', 'Datang ke Lokasi']);
            $table->text('informasi');
            $table->string('alamat');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_pelanggan');
    }
};
