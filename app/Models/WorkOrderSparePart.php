<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkOrderSparePart extends Model
{
    use HasFactory;

    protected $fillable = [
        'work_order_id',
        'device_id',
    ];
}
