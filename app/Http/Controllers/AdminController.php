<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $devices = Device::all();
        return Inertia::render('Admin/Dashboard', ['devices' => $devices]);
    }

    public function getStatistics()
    {
        $totalDevices = Device::count();
        $totalUsers = User::count();

        $activeDevices = Device::where('is_on', true)->count();
        $inactiveDevices = Device::where('is_on', false)->count();

        return response()->json([
            'totalDevices' => $totalDevices,
            'activeDevices' => $activeDevices,
            'inactiveDevices' => $inactiveDevices,
            'totalUsers' => $totalUsers,
        ]);
    }

    public function toggleDeviceStatus($id)
    {
        $device = Device::findOrFail($id);
        $device->is_on = !$device->is_on; // Toggle the status
        $device->save();

        // Return a redirect to the dashboard
        return Inertia::location(route('admin.devices'));
    }

    public function devices()
    {
        $devices = Device::all();
        return Inertia::render('Admin/Devices', ['devices' => $devices]);
    }
}
