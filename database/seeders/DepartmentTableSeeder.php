<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'HRGA',
                'code' => 'HRG',
            ],
            [
                'name' => 'IT',
                'code' => 'ITE',
            ],
            [
                'name' => 'LEGAL',
                'code' => 'LEG',
            ],
            [
                'name' => 'Finance & Accounting',
                'code' => 'FAC',
            ],
            [
                'name' => 'Sales & Marketing',
                'code' => 'MKT',
            ],
            [
                'name' => 'Purchasing',
                'code' => 'PUR',
            ],
            [
                'name' => 'PPIC',
                'code' => 'PPC',
            ],
            [
                'name' => 'Production',
                'code' => 'PRO',
            ],
        ];

        foreach($departments as $department) {
            Department::create($department);
        }
    }
}
