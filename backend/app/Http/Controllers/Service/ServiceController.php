<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Category;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Menampilkan daftar layanan
    public function index()
    {
        $services = Service::with('category')->get();
        return response()->json($services);
    }

    // Menyimpan layanan baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_jasa' => 'required|string',
            'gambar' => 'required|image',
            'perkiraan_harga' => 'required|numeric',
            'kategori_id' => 'required|exists:categories,id',
            'estimasi' => 'required|integer',
        ]);

        $gambarPath = $request->file('gambar')->store('public/images');

        $service = Service::create([
            'nama_jasa' => $request->nama_jasa,
            'gambar' => $gambarPath,
            'perkiraan_harga' => $request->perkiraan_harga,
            'kategori_id' => $request->kategori_id,
            'estimasi' => $request->estimasi,
        ]);

        return response()->json($service, 201);
    }

    // Menampilkan layanan berdasarkan ID
    public function show($id)
    {
        $service = Service::with('category')->find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response()->json($service);
    }

    // Memperbarui layanan
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $validated = $request->validate([
            'nama_jasa' => 'required|string',
            'gambar' => 'nullable|image',
            'perkiraan_harga' => 'required|numeric',
            'kategori_id' => 'required|exists:categories,id',
            'estimasi' => 'required|integer',
        ]);

        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('public/images');
            $service->gambar = $gambarPath;
        }

        $service->update([
            'nama_jasa' => $request->nama_jasa,
            'perkiraan_harga' => $request->perkiraan_harga,
            'kategori_id' => $request->kategori_id,
            'estimasi' => $request->estimasi,
        ]);

        return response()->json($service);
    }

    // Menghapus layanan
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
