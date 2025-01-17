<?php

namespace App\Http\Controllers\Category;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get all categories with pagination
        $categories = Category::latest()->paginate(100);

        //return collection of categories as a resource
        return new CategoryResource(true, 'List Data Categories', $categories);
    }

    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|unique:categories,name',
            'image'     => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/categories', $image->hashName());

        //create category
        $category = Category::create([
            'name'      => $request->name,
            'image'     => $image->hashName(),
        ]);

        //return response
        return new CategoryResource(true, 'Data Category Berhasil Ditambahkan!', $category);
    }

    /**
     * show
     *
     * @param  mixed $id
     * @return void
     */
    public function show($id)
    {
        //find category by ID
        $category = Category::find($id);

        //return single category as a resource
        return new CategoryResource(true, 'Detail Data Category!', $category);
    }

    /**
     * update
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories,name,' . $id,
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find category by ID
        $category = Category::find($id);

        if ($request->hasFile('image')) {

            //upload image
            $image = $request->file('image');
            $image->storeAs('public/categories', $image->hashName());

            //delete old image
            Storage::delete('public/categories/' . basename($category->image));

            //update category with new image
            $category->update([
                'image'     => $image->hashName(),
                'name'      => $request->name,
            ]);
        } else {

            //update category without image
            $category->update([
                'name' => $request->name,
            ]);
        }

        //return response
        return new CategoryResource(true, 'Data Category Berhasil Diubah!', $category);
    }

    /**
     * destroy
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {
        //find category by ID
        $category = Category::find($id);

        //delete image
        Storage::delete('public/categories/' . basename($category->image));

        //delete category
        $category->delete();

        //return response
        return new CategoryResource(true, 'Data Category Berhasil Dihapus!', null);
    }
}

// supabase storage implementation
// <?php

// namespace App\Http\Controllers\Category;

// use App\Models\Category;
// use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;
// use App\Http\Resources\CategoryResource;
// use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Facades\Storage;

// class CategoryController extends Controller
// {
//     /**
//      * index
//      *
//      * @return void
//      */
//     public function index()
//     {
//         //get all categories with pagination
//         $categories = Category::latest()->paginate(100);

//         //return collection of categories as a resource
//         return new CategoryResource(true, 'List Data Categories', $categories);
//     }

//     /**
//      * store
//      *
//      * @param  mixed $request
//      * @return void
//      */
//     public function store(Request $request)
//     {
//         //define validation rules
//         $validator = Validator::make($request->all(), [
//             'name'      => 'required|string|unique:categories,name',
//             'image'     => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//         ]);

//         //check if validation fails
//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         //upload image to Supabase using put()
//         $image = $request->file('image');
//         $path = 'categories/' . $image->hashName();
//         Storage::disk('supabase')->put($path, file_get_contents($image)); // Use put() to upload the file

//         //create category
//         $category = Category::create([
//             'name'  => $request->name,
//             'image' => $path, // Save Supabase path to the database
//         ]);

//         //return response
//         return new CategoryResource(true, 'Data Category Berhasil Ditambahkan!', $category);
//     }

//     /**
//      * show
//      *
//      * @param  mixed $id
//      * @return void
//      */
//     public function show($id)
//     {
//         //find category by ID
//         $category = Category::find($id);

//         //return single category as a resource
//         return new CategoryResource(true, 'Detail Data Category!', $category);
//     }

//     /**
//      * update
//      *
//      * @param  mixed $request
//      * @param  mixed $id
//      * @return void
//      */
//     public function update(Request $request, $id)
//     {
//         //define validation rules
//         $validator = Validator::make($request->all(), [
//             'name' => 'required|string|unique:categories,name,' . $id,
//         ]);

//         //check if validation fails
//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         //find category by ID
//         $category = Category::find($id);

//         if ($request->hasFile('image')) {

//             //upload new image to Supabase using put()
//             $image = $request->file('image');
//             $path = 'categories/' . $image->hashName();
//             Storage::disk('supabase')->put($path, file_get_contents($image));

//             //delete old image from Supabase
//             if ($category->image) {
//                 Storage::disk('supabase')->delete($category->image);
//             }

//             //update category with new image
//             $category->update([
//                 'image' => $path,
//                 'name'  => $request->name,
//             ]);
//         } else {

//             //update category without image
//             $category->update([
//                 'name' => $request->name,
//             ]);
//         }

//         //return response
//         return new CategoryResource(true, 'Data Category Berhasil Diubah!', $category);
//     }

//     /**
//      * destroy
//      *
//      * @param  mixed $id
//      * @return void
//      */
//     public function destroy($id)
//     {
//         //find category by ID
//         $category = Category::find($id);

//         //delete image from Supabase
//         if ($category->image) {
//             Storage::disk('supabase')->delete($category->image);
//         }

//         //delete category
//         $category->delete();

//         //return response
//         return new CategoryResource(true, 'Data Category Berhasil Dihapus!', null);
//     }
// }
