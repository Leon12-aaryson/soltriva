<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $devices = Device::where('user_id', $userId)->get();

        // Calculate statistics
        $stats = [
            'totalDevices' => $devices->count(),
            'activeDevices' => $devices->where('is_on', true)->count(),
            'offlineDevices' => $devices->where('is_on', false)->count(),
            'maintenanceDue' => $devices->where('maintenance_due', true)->count(),
        ];

        // Placeholder for recent activities and notifications
        // Replace these with actual data retrieval logic as needed
        $recentActivities = [
            [
                'id' => 1,
                'description' => 'Activated device "Thermostat A1"',
                'timestamp' => now()->subMinutes(10),
            ],
            [
                'id' => 2,
                'description' => 'Deactivated device "Light Bulb B2"',
                'timestamp' => now()->subHours(1),
            ],
            [
                'id' => 3,
                'description' => 'Scheduled maintenance for "HVAC C3"',
                'timestamp' => now()->subDays(1),
            ],
        ];
        // Sample Notifications
        $notifications = [
            [
                'id' => 1,
                'message' => 'Device "Thermostat A1" has been activated.',
            ],
            [
                'id' => 2,
                'message' => 'Maintenance scheduled for device "HVAC C3".',
            ],
        ];

        return Inertia::render('User/Dashboard', [
            'devices' => $devices,
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'notifications' => $notifications,
        ]);
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


    public function devices()
    {
        // Fetch devices allocated to the authenticated user
        $devices = Device::where('user_id', auth()->id())->get();

        // Return the devices to the User/Devices page
        return Inertia::render('User/Devices', ['devices' => $devices]);
    }
}
