<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\WorkOrder;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WorkOrderController extends Controller
{
    public function take(Request $request, $id)
    {
        try {
            $pic = Auth::user()->id;
            $workOrder = WorkOrder::find($id);

            if (!$workOrder) {
                return ResponseFormatter::error([
                    'message' => 'Work order not found',
                ],'Error',404);
            }
            $workOrder->update([
                'status' => 'PROGRESS',
                'pic_id' => $pic,
            ]);

            return ResponseFormatter::success([
                'workOrder' => $workOrder
            ],'Successfully take work order');
            
        } catch (Exception $error) {
            Log::error('Error taking work order: ' . $error->getMessage());
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Something went wrong',500);
        }
    }
}
