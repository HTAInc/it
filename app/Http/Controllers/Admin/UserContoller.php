<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Section;
use App\Models\User;
use App\Notifications\UserRegistrationNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class UserContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['department','section','roles'])->orderBy('name')->get();

        return Inertia::render("Admin/User/Index",[
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::orderBy('name')->get();
        $sections = Section::orderBy('name')->get();
        $roles = Role::orderBy('name')->get();
        return Inertia::render('Admin/User/Create',[
            'departments' => $departments,
            'sections' => $sections,
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'department_id' => 'required|integer|exists:departments,id',
            'section_id' => 'required|integer|exists:sections,id',
            'role' => 'required|string',
        ]);

        $password = Str::random(8);
        $role = $data['role'];
        $data['password'] = bcrypt($password);
        $user = User::create($data);
        $user->assignRole($data['role']);

        $user->notify(new UserRegistrationNotification($user, $password, $role));

        return redirect()->route('admin.user.index')->with([
            'message' => 'Successfully created a new user',
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
    public function edit(string $id)
    {
        $user = User::with(['roles'])->find($id);
        $departments = Department::orderBy('name')->get();
        $sections = Section::orderBy('name')->get();
        $roles = Role::orderBy('name')->get();
        $users = User::all();
        return Inertia::render('Admin/User/Edit',[
            'user' => $user,
            'departments' => $departments,
            'sections' => $sections,
            'roles' => $roles,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data =$request->all();
        $user->update($data);
        
        if($data['role'] != $data['old_role']){
            $user->removeRole($data['old_role']);
            $user->assignRole($data['role']);
        }

        return redirect()->route('admin.user.index')->with([
            'message' => 'Successfully updated user',
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
}
