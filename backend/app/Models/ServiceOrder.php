<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceOrder extends Model
{
    use HasFactory;

    protected $table = 'service_orders';

    protected $fillable = [
        'user_id',
        'service_id',
        'delivery_type',
        'device_info',
        'estimated_price',
        'shipping_cost',
        'service_cost',
        'payment_status',
        'total_amount',
        'order_status',
        'estimated_time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
