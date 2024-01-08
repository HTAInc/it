<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Device;
use App\Models\User;
use App\Models\WorkOrder;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WorkOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workOrders = WorkOrder::with(['user','user.department','user.section','pic','leader'])->get();

        return Inertia::render('Admin/WorkOrder/Index',[
            'workOrders' => $workOrders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = User::with('department','section')->where('id',Auth::user()->id)->first();
        $devices = Device::whereHas('category', function ($query) {
            $query->where('name', 'CPU');
        })->whereHas('lastTransaction', function ($query) {
            $query->where('status','Available');
        })->with(['category','lastTransaction' => function ($query) {
            $query->latest();
        }])->get();
        
        return Inertia::render('Admin/WorkOrder/Create',[
            'user' => $user,
            'devices' => $devices,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workOrder = WorkOrder::with(['user','user.department','user.section','pic','device','device.category'])->where('id',$id)->first();
        return Inertia::render('Admin/WorkOrder/Show',[
            'workOrder' => $workOrder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $workOrder = WorkOrder::with(['user','user.department','user.section','pic','device','device.category'])->where('id',$id)->first();
        return Inertia::render('Admin/WorkOrder/Edit',[
            'workOrder' => $workOrder
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WorkOrder $workOrder)
    {
        $data = $request->validate([
            'done_at' => 'required|date_format:Y-m-d\TH:i',
            'category' => 'required|string|max:255',
            'action' => 'required|string|max:255',
            'other' => $request->category === 'OTHER' ? ['required', 'string', 'max:255'] : ['nullable'],
        ]);        
        $data['status'] = 'DONE';

        $workOrder->update($data);
        return redirect()->route('admin.work-order.index')->with([
            'message' => 'Successfully update work order',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function take(Request $request,$id)
    {
        try {
        
            $pic= Auth::user()->id;
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
