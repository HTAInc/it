<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'Indo Global Komputer',
                'phone' => '089945354251',
                'email' => 'indoglobal@indoglobal.com',
                'address' => 'Tangerang Kota'
            ],
            [
                'name' => 'Best Seller',
                'phone' => '0214523552',
                'email' => 'bestseller@gmail.com',
                'address' => 'Tangerang Kabupaten'
            ],
        ];

        foreach($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
