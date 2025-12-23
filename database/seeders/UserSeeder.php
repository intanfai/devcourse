<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('iniadmin'),
            'role_id' => 1, // admin
        ]);

        User::create([
            'name' => 'Instructor',
            'email' => 'instructor@gmail.com',
            'password' => Hash::make('iniguru'),
            'role_id' => 2, // instructor
        ]);

        User::create([
            'name' => 'Student',
            'email' => 'student@gmail.com',
            'password' => Hash::make('inisiswa'),
            'role_id' => 3, // student
        ]);
    }

}
