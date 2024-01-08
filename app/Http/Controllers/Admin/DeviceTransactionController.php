<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetTransaction;
use App\Models\DeviceTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DeviceTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $name = $data['name'];
        $data['number'] = null;
        if ($name && preg_match('/(\d{2})$/', $name, $matches)) {
            $data['number'] = intval($matches[1]);
        }
        DeviceTransaction::where('device_id', $data['device_id'])->update(['active' => false]);
        DeviceTransaction::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeviceTransaction $deviceTransaction)
    {
        $data = $request->all();
        $name = $data['name'];
        $data['number'] = null;
        if ($name && preg_match('/(\d{2})$/', $name, $matches)) {
            $data['number'] = intval($matches[1]);
        }
        $deviceTransaction->update([
            'name' => $data['name'],
            'transaction_date' => $data['transaction_date'],
            'status' => $data['status'],
            'ip' => $data['ip'],
            'note' => $data['note'],
            'number' => $data['number'],
            'device_id' => $data['device_id'],
            'user_id' => $data['user_id'],
            'department_id' => $data['department_id'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeviceTransaction $deviceTransaction)
    {
        $deviceId = $deviceTransaction->device_id;
        $deviceTransaction->delete();
        $latestDeviceTransaction = DeviceTransaction::where('device_id', $deviceId)
        ->orderBy('id', 'DESC')
        ->limit(1)
        ->first();
        $latestDeviceTransaction->update(['active'=> true]);
    }
}
