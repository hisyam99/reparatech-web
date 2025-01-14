<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_jasa',
        'gambar',
        'perkiraan_harga',
        'kategori_id',
        'estimasi'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'kategori_id');
    }
}
