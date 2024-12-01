<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use App\Constants\Roles;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        if (auth()->user()->role !== Roles::ADMIN) {
            abort(403); // Forbidden
        }

        $devices = Device::all();
        return Inertia::render('Admin/Dashboard', ['devices' => $devices]);
    }
}
