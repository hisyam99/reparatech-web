<?php
namespace App\Http\Controllers\Category;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Validator;

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
        $categories = Category::latest()->paginate(5);

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
            'name' => 'required|string|unique:categories,name',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create category
        $category = Category::create([
            'name' => $request->name,
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

        //update category
        $category->update([
            'name' => $request->name,
        ]);

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

        //delete category
        $category->delete();

        //return response
        return new CategoryResource(true, 'Data Category Berhasil Dihapus!', null);
    }
}
