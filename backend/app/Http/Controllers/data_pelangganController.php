<?php

namespace App\Http\Controllers;


use App\Models\data_pelanggan;
use Illuminate\Http\Request;

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
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:data_pelanggan,email',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
        ]);

        $dataPelanggan = data_pelanggan::create($validated);

        return response()->json($dataPelanggan, 201);
    }

    // Menampilkan satu data pelanggan berdasarkan ID
    public function show(data_pelanggan $dataPelanggan)
    {
        return response()->json($dataPelanggan);
    }

    // Memperbarui data pelanggan
    public function update(Request $request, data_pelanggan $dataPelanggan)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:data_pelanggan,email,' . $dataPelanggan->id,
            'phone' => 'sometimes|string|max:20',
            'address' => 'nullable|string',
        ]);

        $dataPelanggan->update($validated);

        return response()->json($dataPelanggan);
    }

    // Menghapus data pelanggan
    public function destroy(data_pelanggan $dataPelanggan)
    {
        $dataPelanggan->delete();

        return response()->json(['message' => 'Data deleted successfully']);
    }
}
