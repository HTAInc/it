<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = Section::with([
            'department' => function($query){
                $query->orderBy('name', 'desc');
            }
        ])->get();

        return Inertia::render('Admin/Section/Index',[
            'sections' => $sections
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::orderBy('name')->get();
        return Inertia::render('Admin/Section/Create',[
            'departments' => $departments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:sections,name',
            'department_id' => 'required|integer|exists:departments,id'
        ]);

        Section::create($data);
        return redirect()->route('admin.section.index')->with([
            'message' => 'Successfully Created',
            'type' => 'success',
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
    public function edit(Section $section)
    {
        $departments = Department::orderBy('name')->get();
        return Inertia::render('Admin/Section/Edit',[
            'departments' => $departments,
            'section' => $section
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255|unique:sections,name,' . $section->id,
            'department_id' => 'required|integer|exists:departments,id'
        ]);

        $section->update($data);
        return redirect()->route('admin.section.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return redirect()->route('admin.section.index')->with([
            'message' => 'Successfully Deleted',
            'type' => 'success'
        ]);
    }
}
