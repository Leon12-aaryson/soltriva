<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'serial_number', 'user_id', 'is_on', 'voltage', 'max_voltage', 'min_voltage', 'error_code'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
