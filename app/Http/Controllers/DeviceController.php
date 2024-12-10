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
        return Inertia::render('Admin/Devices', ['devices' => $devices]);
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

        return redirect()->route('admin.devices')->with('success', 'Device added successfully.');
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
}
