<?php

namespace App\Http\Controllers\Service;

use App\Models\Service;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get all services with category relation and pagination
        $services = Service::with('category')->latest()->paginate(100);

        //return collection of services as a resource
        return new ServiceResource(true, 'List Data Services', $services);
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
            'nama_jasa' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'perkiraan_harga' => 'required|numeric',
            'kategori_id' => 'required|exists:categories,id',
            'estimasi' => 'required|integer',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image based on environment
        $image = $request->file('image');
        if (env('FILESYSTEM_DISK') === 'supabase') {
            // Supabase storage
            $path = $image->store('services', 'supabase');
        } else {
            // Local storage
            $image->storeAs('public/services', $image->hashName());
            $path = $image->hashName();
        }

        //create service
        $service = Service::create([
            'nama_jasa' => $request->nama_jasa,
            'image' => $path,
            'perkiraan_harga' => $request->perkiraan_harga,
            'kategori_id' => $request->kategori_id,
            'estimasi' => $request->estimasi,
        ]);

        //return response
        return new ServiceResource(true, 'Data Service Berhasil Ditambahkan!', $service);
    }

    /**
     * show
     *
     * @param  mixed $id
     * @return void
     */
    public function show($id)
    {
        //find service by ID with category relation
        $service = Service::with('category')->find($id);

        //check if service exists
        if (!$service) {
            return new ServiceResource(false, 'Data Service Tidak Ditemukan!', null);
        }

        //return single service as a resource
        return new ServiceResource(true, 'Detail Data Service!', $service);
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
            'nama_jasa' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'perkiraan_harga' => 'required|numeric',
            'kategori_id' => 'required|exists:categories,id',
            'estimasi' => 'required|integer',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find service by ID
        $service = Service::find($id);

        //check if service exists
        if (!$service) {
            return new ServiceResource(false, 'Data Service Tidak Ditemukan!', null);
        }

        //check if image is not empty
        if ($request->hasFile('image')) {
            //upload new image
            $image = $request->file('image');
            if (env('FILESYSTEM_DISK') === 'supabase') {
                // Supabase storage
                $path = $image->store('services', 'supabase');
                if ($service->image) {
                    Storage::disk('supabase')->delete($service->image);
                }
            } else {
                // Local storage
                $image->storeAs('public/services', $image->hashName());
                //delete old image
                Storage::delete('public/services/' . basename($service->image));
                $path = $image->hashName();
            }

            //update service with new image
            $service->update([
                'nama_jasa' => $request->nama_jasa,
                'image' => $path,
                'perkiraan_harga' => $request->perkiraan_harga,
                'kategori_id' => $request->kategori_id,
                'estimasi' => $request->estimasi,
            ]);
        } else {
            //update service without image
            $service->update([
                'nama_jasa' => $request->nama_jasa,
                'perkiraan_harga' => $request->perkiraan_harga,
                'kategori_id' => $request->kategori_id,
                'estimasi' => $request->estimasi,
            ]);
        }

        //return response
        return new ServiceResource(true, 'Data Service Berhasil Diubah!', $service);
    }

    /**
     * destroy
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {
        //find service by ID
        $service = Service::find($id);

        //check if service exists
        if (!$service) {
            return new ServiceResource(false, 'Data Service Tidak Ditemukan!', null);
        }

        if (env('FILESYSTEM_DISK') === 'supabase') {
            // Delete from Supabase
            Storage::disk('supabase')->delete($service->image);
        } else {
            //delete image
            Storage::delete('public/services/' . basename($service->image));
        }

        //delete service
        $service->delete();

        //return response
        return new ServiceResource(true, 'Data Service Berhasil Dihapus!', null);
    }
}
