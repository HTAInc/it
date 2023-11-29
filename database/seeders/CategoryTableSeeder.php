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
                'name' => 'Printer',
                'code' => 'PR'
            ],
            [
                'name' => 'CPU',
                'code' => 'PC'
            ],
            [
                'name' => 'Monitor',
                'code' => 'MT'
            ],
            [
                'name' => 'Notebook',
                'code' => 'NB'
            ],
            [
                'name' => 'Tablet',
                'code' => 'TB'
            ],
        ];

        foreach($categories as $category) {
            Category::create($category);
        }
    }
}
