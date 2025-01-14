<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class service_requests extends Model
{
    //
    use HasFactory;

    protected $table = 'service_requests';

    protected $fillable = [
        'customer_id',
        'device_type',
        'device_model',
        'issue_description',
        'service_type',
        'request_status',
        'request_date',
    ];

    public function payments()
    {
        return $this->hasMany(payments::class, 'service_request_id');
    }

}
