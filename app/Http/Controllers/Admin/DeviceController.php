<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssetStorage;
use App\Models\Category;
use App\Models\Department;
use App\Models\Device;
use App\Models\DeviceTransaction;
use App\Models\Supplier;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assets = Device::with([
            'category', 
            'supplier', 
            'lastTransaction' => function ($query) {
                $query->latest();
            },
            'lastTransaction.department',
            'lastTransaction.user',
        ])
        ->orderBy('code')
        ->get();
        
        $users = User::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();
        $categories = Category::where('type','ASSET')->orderBy('name')->get();

        return Inertia::render('Admin/Device/Index',[
            'assets' => $assets,
            'users' => $users,
            'departments' => $departments,
            'categories' => $categories,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('type','ASSET')->orderBy('name')->get();
        $suppliers = Supplier::orderBy('name')->get();
        $users = User::orderBy('name')->get();
        $assets = Device::all();
        $departments = Department::orderBy('name')->get();
        return Inertia::render('Admin/Device/Create',[
            'categories' => $categories,
            'suppliers' => $suppliers,
            'users' => $users,
            'assets' => $assets,
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data =$request->all();   
        $device = Device::create($data);
        foreach ($data['storages'] as $storage) {
            AssetStorage::create([
                'device_id' => $device->id,
                'storage_type' => $storage['storage_type'],
                'storage_capacity' => $storage['storage_capacity'],
            ]);
        }
        if($request->input('transaction_date')){
            $transactionDate = $request->input('transaction_date');
        }else{
            $transactionDate = Carbon::now();
        }

        $name = $request->input('name');
        $number = null;

        if ($name && preg_match('/(\d{2})$/', $name, $matches)) {
            $number = intval($matches[1]);
        }

        DeviceTransaction::create([
            'name' => $request->input('name'),
            'transaction_date' => $transactionDate,
            'ip' => $request->input('ip'),
            'note' => $request->input('note'),
            'status' => $request->input('status'),
            'active' => true,
            'number' => $number,
            'device_id' => $device->id,
            'user_id' => $request->input('user_id') ?? null,
            'department_id' => $request->input('department_id')
        ]);

        return redirect()->route('admin.device.index')->with([
            'message' => 'Successfully created asset',
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $device = Device::with(['category','supplier','transactions','transactions.department','transactions.user','assetStorage'])->where('id',$id)->first();

        return Inertia::render('Admin/Device/Show',[
            'device' => $device,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $device = Device::with(['category','supplier','transactions','transactions.department','transactions.user','assetStorage'])->where('id',$id)->first();
        $categories = Category::orderBy('name')->get();
        $suppliers = Supplier::orderBy('name')->get();
        $users = User::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();
        $devices = Device::all();
        return Inertia::render('Admin/Device/Edit',[
            'device' => $device,
            'devices' => $devices,
            'categories' => $categories,
            'suppliers' => $suppliers,
            'users' => $users,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Device $device)
    {
        $data= $request->all();
        $device->update($data);
        
        if (isset($data['storages'])) {
            $device->assetStorage()->delete();
            foreach ($data['storages'] as $storage) {
                AssetStorage::create([
                    'device_id' => $device->id,
                    'storage_type' => $storage['storage_type'],
                    'storage_capacity' => $storage['storage_capacity'],
                ]);
            }
        }

        return redirect()->route('admin.device.index')->with([
            'message' => 'Successfully updated asset',
            'type' => 'success'
        ]);
        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Device $device)
    {
        $device->delete();
        return redirect()->route('admin.device.index')->with([
            'message' => 'Successfully deleted asset',
            'type' => 'success'
        ]);
    }

    public function getLastCode(Request $request, $company, $category, $budget)
    {
        $rowCount = Device::where('company', $company)->latest()->value('code');
        $categoryCode = Category::where('id',$category)->value('code');

        if($rowCount === null) {
            $lastCode = sprintf('%03d', 1) . '/' . $company . '/' . $budget . '/' . $categoryCode . sprintf('%03d', 1);
        } else {
            $lastCode = Device::where('company', $company)
            ->where('category_id', $category)
            ->latest()
            ->value('code');

            $lastNumber = substr($rowCount, 0, 3);
            $newNumber = intval($lastNumber) + 1;

            if ($lastCode) {
                preg_match('/^(\d+).*?(\d+)$/', $lastCode, $matches);
                $lastNumberCategory = $matches[2];
                $newNumberCategory = intval($lastNumberCategory) + 1;
                $newCode = sprintf('%03d', $newNumberCategory);
                $lastCode = sprintf('%03d', $newNumber) . '/' . $company . '/' . $budget . '/' . $categoryCode . $newCode;
            } else {
                $lastCode = sprintf('%03d', $newNumber) . '/' . $company . '/' . $budget . '/' . $categoryCode . sprintf('%03d', 1);
            }
        }
        return response()->json(['lastCode' => $lastCode]);
    }

    public function getLastName(Request $request,$status, $company, $category,$department)
    {
        if($status === 'Installed'){
            $departmentCode = Department::where('id',$department)->value('code'); 
            $categoryCode = Category::where('id', $category)->value('code');

            $rowCount = DeviceTransaction::with(['device','department','device.category'])
                ->join('devices', 'device_transactions.device_id', '=', 'devices.id')
                ->join('departments', 'device_transactions.department_id', '=', 'departments.id')
                ->join('categories', 'devices.category_id', '=', 'categories.id')
                ->where('devices.company', $company)
                ->where('departments.code', $departmentCode)
                ->where('categories.code', $categoryCode)
                ->count();

            if($rowCount === 0){
                $data[] = ['name' => $company.'-'.$departmentCode.'-'.$categoryCode. sprintf('%02d', 1)];
            }else{
                $data = DeviceTransaction::select('device_transactions.name')
                ->distinct('device_transactions.name')
                ->join('devices', 'device_transactions.device_id', '=', 'devices.id')
                ->where('device_transactions.department_id', $department)
                ->where('device_transactions.active', false)
                ->where('devices.category_id', $category)
                ->whereNotExists(function ($query) use ($department) {
                    $query->selectRaw(1)
                        ->from('device_transactions as dt')
                        ->whereColumn('dt.name', 'device_transactions.name')
                        ->where('dt.active', true)
                        ->where('dt.department_id', $department);
                })
                ->get();

                $lastRecord = DeviceTransaction::select('device_transactions.name')
                    ->join('devices', 'device_transactions.device_id', '=', 'devices.id')
                    ->join('departments', 'device_transactions.department_id', '=', 'departments.id')
                    ->join('categories', 'devices.category_id', '=', 'categories.id')
                    ->where('devices.company', $company)
                    ->where('departments.code', $departmentCode)
                    ->where('categories.code', $categoryCode)
                    ->orderBy('number','DESC')
                    ->limit(1)
                    ->get();
            

                
                $lastCode= $lastRecord->value('name');

                preg_match('/^([A-Z]+)-([A-Z]+)-([A-Z]+)(\d+)$/', $lastCode, $matches);
                $number = intval($matches[4]);
                $newNumber = $number + 1;
                $newCode = $company.'-'.$departmentCode.'-'.$categoryCode. sprintf('%02d', $newNumber);
                $newData = ['name' => $newCode];
                $data[] = $newData;
            }
            return response()->json(['data' => $data]);
        }
    }

}
