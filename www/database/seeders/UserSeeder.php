<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where("email", "admin@admin.com.br")->first();
        if (!$user) {
            User::create([
                "name" => "Admin",
                "email" => "admin@admin.com.br",
                "password" => bcrypt("Pagrisa123@")
            ]);
        }
    }
}
