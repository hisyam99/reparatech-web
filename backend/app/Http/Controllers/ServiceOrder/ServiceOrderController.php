<?php

namespace App\Http\Controllers\ServiceOrder;

use App\Models\ServiceOrder;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceOrderResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ServiceOrderController extends Controller
{
    /**
     * Display a listing of service orders.
     */
    public function index()
    {
        // Get all service orders with pagination and relationships
        $orders = ServiceOrder::with(['user', 'service.category'])
            ->latest()
            ->paginate(10);

        return new ServiceOrderResource(true, 'List Data Service Orders', $orders);
    }

    /**
     * Store a new service order.
     */
    public function store(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'delivery_type' => 'required|in:pickup,delivery',
            'device_info' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Get service details
        $service = Service::findOrFail($request->service_id);

        // Calculate costs
        $shipping_cost = $request->delivery_type === 'delivery' ? 20000 : 0;
        $service_cost = $service->perkiraan_harga;
        $total_amount = $service_cost + $shipping_cost;

        // Create service order
        $order = ServiceOrder::create([
            'user_id' => Auth::id(),
            'service_id' => $request->service_id,
            'delivery_type' => $request->delivery_type,
            'device_info' => $request->device_info,
            'estimated_price' => $service->perkiraan_harga,
            'shipping_cost' => $shipping_cost,
            'service_cost' => $service_cost,
            'payment_status' => 'unpaid',
            'total_amount' => $total_amount,
            'order_status' => 'pending',
            'estimated_time' => $service->estimasi
        ]);

        // Load relationships
        $order->load(['user', 'service.category']);

        return new ServiceOrderResource(true, 'Service Order Created Successfully', $order);
    }

    /**
     * Display the specified service order.
     */
    public function show($id)
    {
        $order = ServiceOrder::with(['user', 'service.category'])->find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        return new ServiceOrderResource(true, 'Service Order Detail', $order);
    }

    /**
     * Update service order status.
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'order_status' => 'required|in:pending,processing,completed,cancelled',
            'payment_status' => 'required|in:unpaid,paid,refunded'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $order = ServiceOrder::find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        $order->update([
            'order_status' => $request->order_status,
            'payment_status' => $request->payment_status
        ]);

        return new ServiceOrderResource(true, 'Service Order Status Updated', $order);
    }

    /**
     * Get user's service orders.
     */
    public function getUserOrders()
    {
        $orders = ServiceOrder::with(['service.category'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return new ServiceOrderResource(true, 'User Service Orders', $orders);
    }
}
