<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'type' => 'ASSET',
                'name' => 'Printer',
                'code' => 'PR'
            ],
            [
                'type' => 'ASSET',
                'name' => 'CPU',
                'code' => 'PC'
            ],
            [
                'type' => 'ASSET',
                'name' => 'Monitor',
                'code' => 'MT'
            ],
            [
                'type' => 'ASSET',
                'name' => 'Notebook',
                'code' => 'NB'
            ],
            [
                'type' => 'ASSET',
                'name' => 'Tablet',
                'code' => 'TB'
            ],
            [
                'type' => 'SUPPORT',
                'name' => 'Mouse',
                'code' => 'MS'
            ],
            [
                'type' => 'SUPPORT',
                'name' => 'Keyboard',
                'code' => 'KB'
            ],
        ];

        foreach($categories as $category) {
            Category::create($category);
        }
    }
}
