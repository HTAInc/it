<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssetTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AssetTransactionController extends Controller
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
        $data = $request->validate([
            'note' => 'nullable|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'supplier_id' => 'required|integer|exists:suppliers,id',
            'user_id' => ($request->input('status') === 'Installed' && ($request->input('category_name') === 'CPU' || $request->input('category_name') === 'Notebook' || $request->input('category_name') === 'Tablet')) ? 'required|integer|exists:users,id':'nullable|integer|exists:users,id',
            'department_id' => $request->input('status') === 'Installed' ? 'required|integer|exists:departments,id':'nullable|integer|exists:departments,id',
            'name' => $request->input('status') === 'Installed' ? 'required|string|unique:asset_transactions,name':'nullable|string',
            'transaction_date' => $request->input('status') === 'Installed' ? 'required|date':'nullable|date',
        ]);

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
}
