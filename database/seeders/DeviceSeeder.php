<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Device;
use Faker\Factory as Faker;

class DeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Fetch all users
        $users = User::all();

        // Create sample devices for each user
        foreach ($users as $user) {
            Device::create([
                'name' => 'Device for ' . $user->name,
                'serial_number' => 'SN-' . uniqid(),
                'user_id' => $user->id,
                'is_on' => $faker->boolean,
                'voltage' => $faker->randomFloat(2, 220, 240),
                'max_voltage' => 250,
                'min_voltage' => 200,
            ]);
        }
    }
}
