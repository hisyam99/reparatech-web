<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_jasa',
        'image',
        'perkiraan_harga',
        'kategori_id',
        'estimasi'
    ];

    /**
     * image
     *
     * @return Attribute
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: function ($image) {
                // Check the environment
                if (env('FILESYSTEM_DISK') === 'supabase') {
                    /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
                    $disk = Storage::disk('supabase');
                    return $image ? $disk->url($image) : null;
                }

                // Default to local storage
                return $image ? url('/storage/services/' . $image) : null;
            },
        );
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'kategori_id');
    }
}
