<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class payments extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'service_request_id',
        'amount',
        'payment_method',
        'payment_status',
        'payment_date',
    ];

    // Relasi dengan ServiceRequest
    public function serviceRequest()
    {
        return $this->belongsTo(service_requests::class, 'service_request_id');
    }
}
