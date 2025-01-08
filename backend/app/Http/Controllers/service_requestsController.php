<?php

namespace App\Http\Controllers;


use App\Models\service_requests;
use Illuminate\Http\Request;

class Service_requestsController extends Controller
{
    // Menampilkan semua permintaan layanan
    public function index()
    {
        $serviceRequests = service_requests::all();
        return response()->json($serviceRequests);
    }

    // Menambahkan permintaan layanan baru
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:data_pelanggan,id',
            'device_type' => 'required|string|max:255',
            'device_model' => 'required|string|max:255',
            'issue_description' => 'required|string|max:255',
            'service_type' => 'required|string|max:255',
            'request_status' => 'required|string|in:pending,completed,canceled',
            'request_date' => 'required|date',
        ]);


        $serviceRequest = service_requests::create($request->all());
        return response()->json([
            'message' => 'Service request created successfully.',
            'data' => $serviceRequest,
        ], 201);
    }

    // Menampilkan detail permintaan layanan
    public function show($id)
    {
        $serviceRequest = service_requests::find($id);
        if (!$serviceRequest) {
            return response()->json(['message' => 'Permintaan layanan tidak ditemukan'], 404);
        }
        return response()->json($serviceRequest);
    }

    // Memperbarui permintaan layanan
    public function update(Request $request, $id)
    {
        $serviceRequest = service_requests::find($id);
        if (!$serviceRequest) {
            return response()->json(['message' => 'Permintaan layanan tidak ditemukan'], 404);
        }

        // Validasi input
        $request->validate([
            'customer_id' => 'exists:data_pelanggan,id',
            'device_type' => 'nullable|string|max:255',
            'device_model' => 'nullable|string|max:255',
            'issue_description' => 'nullable|string|max:255',
            'service_type' => 'nullable|string|max:255',
            'request_status' => 'nullable|string|in:pending,in_progress,completed,canceled',
            'request_date' => 'nullable|date',
        ]);

        $serviceRequest->update($request->all());
        return response()->json([
            'message' => 'Service request updated successfully.',
            'data' => $serviceRequest,
        ]);
    }


    // Mengubah status service request menjadi 'completed'
    public function completeServiceRequest($id)
    {
        $serviceRequest = service_requests::find($id);
        if (!$serviceRequest) {
            return response()->json(['message' => 'Service request not found.'], 404);
        }

        // Update status menjadi 'completed'
        $serviceRequest->update(['request_status' => 'completed']);

        return response()->json(['message' => 'Service request marked as completed.']);
    }


    // Membatalkan permintaan layanan
    public function cancel($id)
    {
        $serviceRequest = service_requests::find($id);
        if (!$serviceRequest) {
            return response()->json(['message' => 'Permintaan layanan tidak ditemukan'], 404);
        }

        // Mengupdate status menjadi 'canceled'
        $serviceRequest->update(['request_status' => 'canceled']);
        return response()->json(['message' => 'Permintaan layanan dibatalkan', 'data' => $serviceRequest]);
    }

    // Menghapus permintaan layanan
    public function destroy($id)
    {
        $serviceRequest = service_requests::find($id);
        if (!$serviceRequest) {
            return response()->json(['message' => 'Permintaan layanan tidak ditemukan'], 404);
        }

        $serviceRequest->delete();
        return response()->json(['message' => 'Permintaan layanan berhasil dihapus']);
    }
}
