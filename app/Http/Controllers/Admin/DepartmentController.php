<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::orderBy('name')->get();
        
        return Inertia::render('Admin/Department/Index',[
            'departments' => $departments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Department/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:departments',
        ]);

        Department::create($data);
        return redirect()->route('admin.department.index')->with([
            'message' => 'Successfully Created',
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
    public function edit(Department $department)
    {
        return Inertia::render('Admin/Department/Edit',[
            'department' => $department
        ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,'. $department->id
        ]);

        $department->update($data);
        return redirect()->route('admin.department.index')->with([
            'message' => 'Successfully updated',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('admin.department.index')->with([
            'message' => 'Successfully deleted',
             'type' => 'success'
        ]);
    }
}
