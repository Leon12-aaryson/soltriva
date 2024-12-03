<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        $devices = Device::all();
        return Inertia::render('Admin/Dashboard', ['devices' => $devices]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string|unique:devices,serial_number',
        ]);

        Device::create([
            'name' => $request->name,
            'serial_number' => $request->serial_number,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('admin.dashboard')->with('success', 'Device added successfully.');
    }
}
