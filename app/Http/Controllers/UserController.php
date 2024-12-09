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
        return Inertia::render('User/Dashboard', ['devices' => $devices]);
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
        ]);

        return redirect()->route('user.dashboard')->with('success', 'Device registered successfully.');
    }

    public function getMetrics()
    {
        // Fetch and return metrics and historical data
        $metrics = [
            'rpm' => 1200, // Example data
            'voltageImbalance' => 5,
            'powerInput' => 1500,
            'powerOutput' => 1400,
            'temperature' => 75,
            'current' => 10,
        ];

        $historicalData = [
            'voltageImbalance' => [1, 2, 3, 4, 5], // Example historical data
            'current' => [8, 9, 10, 11, 12],
        ];

        return response()->json(['metrics' => $metrics, 'historicalData' => $historicalData]);
    }

    public function togglePump()
    {
        // Logic to toggle the pump
        // Example: Update the pump status in the database
    }
}
