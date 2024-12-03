<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $devices = Device::where('user_id', auth()->id())->get();
        $alerts = [];

        foreach ($devices as $device) {
            if ($device->voltage > $device->max_voltage) {
                $alerts[] = "Overvoltage detected on device {$device->name}.";
            } elseif ($device->voltage < $device->min_voltage) {
                $alerts[] = "Undervoltage detected on device {$device->name}.";
            }
        }

        return Inertia::render('User/Dashboard', compact('devices', 'alerts'));
    }

    public function registerDevice(Request $request)
    {
        $request->validate([
            'serial_number' => 'required|string|unique:devices,serial_number',
            'name' => 'required|string|max:255',
        ]);

        Device::create([
            'serial_number' => $request->serial_number,
            'name' => $request->name,
            'user_id' => auth()->id(),
            // Set default values for other fields
        ]);

        return Inertia::render('User/Dashboard', ['status' => 'Device registered successfully.']);
    }
}
