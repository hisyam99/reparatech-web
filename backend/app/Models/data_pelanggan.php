<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class data_pelanggan extends Model
{
    use HasFactory;

    protected $table = 'data_pelanggan';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];

    public function service_requests()
    {
        return $this->hasMany(service_requests::class, 'customer_id');
    }
}
