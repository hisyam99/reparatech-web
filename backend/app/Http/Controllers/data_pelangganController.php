<?php

namespace App\Http\Controllers;

use App\Models\data_pelanggan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class data_pelangganController extends Controller
{
    // Menampilkan semua data pelanggan
    public function index()
    {
        return response()->json(data_pelanggan::all());
    }

    // Menambahkan data pelanggan baru
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'nomorHp' => 'required|string|max:20',
                'email' => 'required|email|max:255',
                'jenisPengiriman' => 'required|in:antar-jemput,datang-lokasi',
                'informasi' => 'required|string|max:255',
                'alamat' => 'required|string|max:255',
                'gambar' => 'nullable|image|max:1024',
            ]);
    
            // Handle upload gambar
            if ($request->hasFile('gambar')) {
                $imagePath = $request->file('gambar')->store('public/images');
                $validated['gambar'] = $imagePath;
            }
    
            // Simpan data ke database
            $dataPelanggan = data_pelanggan::create($validated);
    
            return response()->json($dataPelanggan, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    // Menampilkan satu data pelanggan berdasarkan ID
    public function show(data_pelanggan $dataPelanggan)
    {
        return response()->json($dataPelanggan);
    }

    // Memperbarui data pelanggan
    public function update(Request $request, data_pelanggan $dataPelanggan)
    {
        // Validasi data yang diterima
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nomorHp' => 'required|string|max:20',
            'email' => 'sometimes|email|unique:data_pelanggan,email,' . $dataPelanggan->id,
            'jenisPengiriman' => 'required|in:antar-jemput,datang-lokasi',
            'informasi' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'gambar' => 'nullable|image|max:1024', // Maksimal ukuran file 1MB
        ]);

        if ($request->hasFile('gambar')) {
            $imagePath = $request->file('gambar')->store('public/images');
            $validated['gambar'] = $imagePath;
        }
        

        // Perbarui data pelanggan
        $dataPelanggan->update($validated);

        // Kembalikan respons JSON
        return response()->json($dataPelanggan);
    }

    // Menghapus data pelanggan
    public function destroy(data_pelanggan $dataPelanggan)
    {
        // Hapus file gambar jika ada
        if ($dataPelanggan->gambar) {
            Storage::delete($dataPelanggan->gambar);
        }

        // Hapus data dari database
        $dataPelanggan->delete();

        // Kembalikan respons JSON
        return response()->json(['message' => 'Data deleted successfully']);
    }
}
