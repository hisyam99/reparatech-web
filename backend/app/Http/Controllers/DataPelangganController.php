<?php
namespace App\Http\Controllers;

use App\Models\DataPelanggan;
use Illuminate\Http\Request;

class DataPelangganController extends Controller
{
    public function index()
{
    try {
        $dataPelanggan = DataPelanggan::all();
        return response()->json($dataPelanggan);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to retrieve data',
            'message' => $e->getMessage()
        ], 500);
    }
}


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nomor_hp' => 'required|string|max:15',
            'email' => 'required|email|unique:data_pelanggan,email',
            'jenis_pengiriman' => 'required|string|in:Layanan Antar Jemput,Datang ke Lokasi',
            'informasi' => 'required|string',
            'alamat' => 'required|string',
        ]);

        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('uploads', 'public');
            $validatedData['gambar'] = $gambarPath;
        }

        DataPelanggan::create($validatedData);

        return response()->json([
            'message' => 'Data pelanggan berhasil disimpan.',
        ], 200);
    }

    public function show($id)
    {
        $dataPelanggan = DataPelanggan::findOrFail($id);
        return response()->json($dataPelanggan);
    }

    public function update(Request $request, $id)
    {
        $dataPelanggan = DataPelanggan::findOrFail($id);

        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nomor_hp' => 'required|string|max:15',
            'email' => 'required|email|unique:data_pelanggan,email,' . $id,
            'jenis_pengiriman' => 'required|string|in:Layanan Antar Jemput,Datang ke Lokasi',
            'informasi' => 'required|string',
            'alamat' => 'required|string',
        ]);

        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('uploads', 'public');
            $validatedData['gambar'] = $gambarPath;
        }

        $dataPelanggan->update($validatedData);

        return response()->json([
            'message' => 'Data pelanggan berhasil diperbarui.',
        ], 200);
    }

    public function destroy($id)
    {
        $dataPelanggan = DataPelanggan::findOrFail($id);
        $dataPelanggan->delete();

        return response()->json([
            'message' => 'Data pelanggan berhasil dihapus.',
        ], 200);
    }
}
