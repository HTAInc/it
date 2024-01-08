<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Role::create(['name' => 'admin']);
       Role::create(['name' => 'user']);
       Role::create(['name' => 'leader']);
       Role::create(['name' => 'subLeader']);
    }
}
