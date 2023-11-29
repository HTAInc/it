<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetInstallation;
use App\Models\Assets;
use App\Models\AssetTransaction;
use App\Models\Category;
use App\Models\Department;
use App\Models\Supplier;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assets = Asset::with([
            'category', 
            'supplier', 
            'assetTransaction' => function ($query) {
                $query->where('status', 'ACTIVE');
            },
            'assetTransaction.department',
            'assetTransaction.user'
        ])->orderBy('code')->get();
        $users = User::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();

        return Inertia::render('Admin/Asset/Index',[
            'assets' => $assets,
            'users' => $users,
            'departments' => $departments,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        $suppliers = Supplier::orderBy('name')->get();
        $users = User::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();
        return Inertia::render('Admin/Asset/Create',[
            'categories' => $categories,
            'suppliers' => $suppliers,
            'users' => $users,
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'company' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:assets',
            'serial_number' => 'required|string|max:255|unique:assets',
            'brand' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'processor_type' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'processor_description' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'ram_type' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'ram_capacity' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'storage_type' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'storage_capacity' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'vga_card' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'os_type' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'os_edition' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'os_architecture' => $request->input('category_name') == 'CPU' ? 'required|string|max:255' : 'nullable|string|max:255',
            'os_licence' => 'nullable|string|max:255|unique:assets,os_licence',
            'office_licence' => 'nullable|string|max:255|unique:assets,office_licence',
            'purchase_date' => 'required|date',
            'warranty_expiry_date' => 'nullable|date',
            'price' => 'required|numeric',
            'status' => 'required|string|max:255',
            'note' => 'nullable|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'supplier_id' => 'required|integer|exists:suppliers,id',
            'user_id' => ($request->input('status') === 'Installed' && ($request->input('category_name') === 'CPU' || $request->input('category_name') === 'Notebook' || $request->input('category_name') === 'Tablet')) ? 'required|integer|exists:users,id':'nullable|integer|exists:users,id',
            'department_id' => $request->input('status') === 'Installed' ? 'required|integer|exists:departments,id':'nullable|integer|exists:departments,id',
            'name' => $request->input('status') === 'Installed' ? 'required|string|unique:asset_transactions,name':'nullable|string',
            'transaction_date' => $request->input('status') === 'Installed' ? 'required|date':'nullable|date',
        ]);

        $asset = Asset::create($data);
        if($request->input('transaction_date')){
            $transactionDate = $request->input('transaction_date');
        }else{
            $transactionDate = Carbon::now();
        }

        AssetTransaction::create([
            'name' => $request->input('name'),
            'transaction_date' => $transactionDate,
            'asset_id' => $asset->id,
            'user_id' => $request->input('user_id') ?? null,
            'department_id' => $request->input('department_id')
        ]);

        return redirect()->route('admin.asset.index')->with([
            'message' => 'Successfully created asset',
            'type' => 'success'
        ]);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getLastCode(Request $request, $company, $category, $budget)
    {
        $rowCount = Asset::where('company', $company)->latest()->value('code');
        $categoryCode = Category::where('id',$category)->value('code');

        if($rowCount === null) {
            $lastCode = sprintf('%03d', 1) . '/' . $company . '/' . $budget . '/' . $categoryCode . sprintf('%03d', 1);
        } else {
            $lastCode = Asset::where('company', $company)
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

    public function getLastName(Request $request, $company, $category,$department)
    {
        $departmentCode = Department::where('id',$department)->value('code'); 
        $categoryCode = Category::where('id', $category)->value('code');

        
        $rowCount = AssetTransaction::with(['asset','department','asset.category'])
            ->join('assets', 'asset_transactions.asset_id', '=', 'assets.id')
            ->join('departments', 'asset_transactions.department_id', '=', 'departments.id')
            ->join('categories', 'assets.category_id', '=', 'categories.id')
            ->where('assets.company', $company)
            ->where('departments.code', $departmentCode)
            ->where('categories.code', $categoryCode)
            ->count();

        if($rowCount === 0){
            $newNumber = 1;
        }else{
            $lastRecord = AssetTransaction::select('asset_transactions.id', 'asset_transactions.name')
                ->join('assets', 'asset_transactions.asset_id', '=', 'assets.id')
                ->join('departments', 'asset_transactions.department_id', '=', 'departments.id')
                ->join('categories', 'assets.category_id', '=', 'categories.id')
                ->where('assets.company', $company)
                ->where('departments.code', $departmentCode)
                ->where('categories.code', $categoryCode)
                ->orderBy('id','DESC')
                ->limit(1)
                ->get();
                
            $lastCode= $lastRecord->value('name');

            preg_match('/^([A-Z]+)-([A-Z]+)-([A-Z]+)(\d+)$/', $lastCode, $matches);
            $number = intval($matches[4]);
            $newNumber = $number + 1;
        }
        $lastName = $company.'-'.$departmentCode.'-'.$categoryCode. sprintf('%02d', $newNumber);

        return response()->json(['lastName' => $lastName]);
    }

}
