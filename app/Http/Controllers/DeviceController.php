<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class DeviceController extends Controller
{
    public function index()
    {
        $devices = Device::with('user')->get();
        $users = User::all();
        return Inertia::render('Admin/Devices', [
            'devices' => $devices,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string|unique:devices,serial_number',
            'user_id' => 'required|exists:users,id',
        ]);

        $device = Device::create([
            'name' => $request->name,
            'serial_number' => $request->serial_number,
            'user_id' => $request->user_id,
        ]);

        return redirect()->route('admin.devices')->with('success', 'Device created successfully.');
    }

    public function destroy($id)
    {
        Device::findOrFail($id)->delete();
        return redirect()->route('admin.devices')->with('success', 'Device deleted successfully.');
    }

    public function update(Request $request, $id)
    {
        $device = Device::findOrFail($id);
        $device->update($request->all());
        return redirect()->route('admin.devices')->with('success', 'Device updated successfully.');
    }

    // public function toggleDeviceStatus($id)
    // {
    //     $device = Device::findOrFail($id);
    //     $device->is_on = !$device->is_on; // Toggle the status
    //     $device->save();

    //     if (auth()->user()->role === 'admin') {
    //         return Inertia::render('Admin/Devices', ['devices' => Device::all()]);
    //     } else {
    //         return response()->json(['success' => true]);
    //     }
    // }

    public function toggleDeviceStatus($id)
    {
        $device = Device::findOrFail($id);
        $device->is_on = !$device->is_on; // Toggle the status
        $device->save();

        // Return a redirect to the dashboard
        if (auth()->user()->role === 'admin') {
            return Inertia::location(route('admin.devices'));
        } else {
            return Inertia::location(route('user.devices'));
        }
    }

    public function analytics($id) {
        $device = Device::findOrFail($id);

        return Inertia::render('User/DeviceAnalytics', [
            'device' => $device,
        ]);
    }
}
