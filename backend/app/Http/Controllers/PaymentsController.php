<?php


namespace App\Http\Controllers;

use App\Models\payments;
use App\Models\service_requests;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    // Menambahkan pembayaran
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'service_request_id' => 'required|exists:service_requests,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:cash,card,online',
        ]);

        // Cari service request berdasarkan ID
        $serviceRequest = service_requests::find($request->service_request_id);

        // Cek apakah status service request adalah 'completed'
        if ($serviceRequest->request_status !== 'completed') {
            return response()->json([
                'message' => 'Payment can only be made for completed service requests.',
            ], 400); // Response jika status bukan 'completed'
        }

        // Proses pembayaran jika status adalah 'completed'
        $payment = payments::create([
            'service_request_id' => $request->service_request_id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'payment_status' => 'completed', // Set default payment_status
            'payment_date' => now(),
        ]);

        return response()->json([
            'message' => 'Payment successfully recorded.',
            'data' => $payment,
        ], 201); // Response jika pembayaran berhasil
    }

    // Menampilkan semua pembayaran
    public function index()
    {
        $payments = payments::with('serviceRequest')->get(); // Mengambil semua data dengan relasi
        // Format amount untuk output
        $payments->transform(function ($payment) {
            $payment->amount = number_format($payment->amount, 0, ',', '.');
            return $payment;
        });

        return response()->json($payments);
    }

    // Menampilkan detail pembayaran
    public function show($id)
    {
        $payment = payments::with('serviceRequest')->find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found.'], 404);
        }
        return response()->json($payment);
    }
}
