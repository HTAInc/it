<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'name' => 'HR',
                'department_id' => '1',
            ],
            [
                'name' => 'GA',
                'department_id' => '1',
            ],
            [
                'name' => 'IT',
                'department_id' => '2',
            ],
            [
                'name' => 'LEGAL',
                'department_id' => '3',
            ],
            [
                'name' => 'Finance & Accounting',
                'department_id' => '4',
            ],
            [
                'name' => 'Production',
                'department_id' => '8',
            ],
            [
                'name' => 'Molding',
                'department_id' => '8',
            ],
            [
                'name' => 'Trimming',
                'department_id' => '8',
            ],
            [
                'name' => 'Visual Inspection',
                'department_id' => '8',
            ],
        ];

        foreach($sections as $section) {
            Section::create($section);
        }
    }
}
