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
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('data_pelanggan')->onDelete('cascade')->onUpdate('cascade');
            $table->enum('device_type', ['HP', 'Laptop']);
            $table->string('device_model')->nullable();
            $table->text('issue_description')->nullable();
            $table->string('service_type')->nullable();
            $table->enum('request_status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->timestamp('request_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_requests');
    }
};
