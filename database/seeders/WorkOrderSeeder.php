<?php

namespace Database\Seeders;

use App\Models\WorkOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workOrders = [
            [
                'code' => '0001/IT/WO/056/12/2023',
                'request' => 'Komputer tidak bisa menyala',
                'status' => 'CREATED',
                'user_id' => 1,
                'device_id' => 1
            ],
        ];
        foreach($workOrders as $workOrder) {
            WorkOrder::create($workOrder);
        }
    }
}
