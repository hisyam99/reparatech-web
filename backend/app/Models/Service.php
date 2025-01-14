<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
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

    /**
     * image
     *
     * @return Attribute
     */
    protected function gambar(): Attribute
    {
        return Attribute::make(
            get: fn($gambar) => url('/storage/services/' . $gambar),
        );
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'kategori_id');
    }
}
