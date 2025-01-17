<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
    ];

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
                return $image ? url('/storage/categories/' . $image) : null;
            },
        );
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'kategori_id');
    }
}
