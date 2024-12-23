<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceAnalytics extends Model
{
    use HasFactory;

    protected $fillable = ['device_id', 'recorded_at', 'voltage', 'current', 'temperature', 'voltage', 'max_voltage', 'min_voltage', 'error_code'];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
