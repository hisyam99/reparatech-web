<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

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
            get: fn($image) => url('/storage/categories/' . $image),
        );
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'kategori_id');
    }
}

// supabase storage implementation
// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Casts\Attribute;
// use Illuminate\Database\Eloquent\Model;
// use Illuminate\Support\Facades\Storage;

// class Category extends Model
// {
//     use HasFactory;

//     protected $fillable = [
//         'name',
//         'image',
//     ];

//     protected function image(): Attribute
//     {
//         return Attribute::make(
//             get: function ($image) {
//                 /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
//                 $disk = Storage::disk('supabase');
//                 return $image ? $disk->url($image) : null;
//             },
//         );
//     }

//     public function services()
//     {
//         return $this->hasMany(Service::class, 'kategori_id');
//     }
// }
