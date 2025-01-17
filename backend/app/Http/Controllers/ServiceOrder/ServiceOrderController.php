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
    public function index()
    {
        $orders = ServiceOrder::with(['user', 'service.category'])->latest()->paginate(100);
        return new ServiceOrderResource(true, 'List Data Service Orders', $orders);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'delivery_type' => 'required|in:pickup,delivery',
            'device_info' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $service = Service::findOrFail($request->service_id);
        $shipping_cost = $request->delivery_type === 'delivery' ? 20000 : 0;
        $service_cost = $service->perkiraan_harga;
        $total_amount = $service_cost + $shipping_cost;

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

        $order->load(['user', 'service.category']);
        return new ServiceOrderResource(true, 'Service Order Created Successfully', $order);
    }

    public function show($id)
    {
        $order = ServiceOrder::with(['user', 'service.category'])->find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        return new ServiceOrderResource(true, 'Service Order Detail', $order);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'delivery_type' => 'required|in:pickup,delivery',
            'device_info' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $order = ServiceOrder::with(['user', 'service.category'])->find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->order_status !== 'pending') {
            return response()->json([
                'message' => 'Only pending orders can be modified'
            ], 422);
        }

        $service = Service::findOrFail($request->service_id);
        $shipping_cost = $request->delivery_type === 'delivery' ? 20000 : 0;
        $service_cost = $service->perkiraan_harga;
        $total_amount = $service_cost + $shipping_cost;

        $order->update([
            'service_id' => $request->service_id,
            'delivery_type' => $request->delivery_type,
            'device_info' => $request->device_info,
            'estimated_price' => $service->perkiraan_harga,
            'shipping_cost' => $shipping_cost,
            'service_cost' => $service_cost,
            'total_amount' => $total_amount,
            'estimated_time' => $service->estimasi
        ]);

        $order->load(['user', 'service.category']);
        return new ServiceOrderResource(true, 'Service Order Updated Successfully', $order);
    }

    public function destroy($id)
    {
        $order = ServiceOrder::find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->order_status !== 'pending') {
            return response()->json([
                'message' => 'Only pending orders can be deleted'
            ], 422);
        }

        $order->delete();
        return new ServiceOrderResource(true, 'Service Order Deleted Successfully', null);
    }

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

    public function getUserOrders()
    {
        $orders = ServiceOrder::with(['service.category'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return new ServiceOrderResource(true, 'User Service Orders', $orders);
    }

    public function adminUpdate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'delivery_type' => 'required|in:pickup,delivery',
            'device_info' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $order = ServiceOrder::with(['user', 'service.category'])->find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        $service = Service::findOrFail($request->service_id);
        $shipping_cost = $request->delivery_type === 'delivery' ? 20000 : 0;
        $service_cost = $service->perkiraan_harga;
        $total_amount = $service_cost + $shipping_cost;

        $order->update([
            'service_id' => $request->service_id,
            'delivery_type' => $request->delivery_type,
            'device_info' => $request->device_info,
            'estimated_price' => $service->perkiraan_harga,
            'shipping_cost' => $shipping_cost,
            'service_cost' => $service_cost,
            'total_amount' => $total_amount,
            'estimated_time' => $service->estimasi
        ]);

        $order->load(['user', 'service.category']);
        return new ServiceOrderResource(true, 'Service Order Updated Successfully', $order);
    }

    public function adminDestroy($id)
    {
        $order = ServiceOrder::find($id);

        if (!$order) {
            return new ServiceOrderResource(false, 'Service Order Not Found', null);
        }

        $order->delete();
        return new ServiceOrderResource(true, 'Service Order Deleted Successfully', null);
    }
}
