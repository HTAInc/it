import Filter from "@/Components/Filter";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from 'react-select';
import getSelectStyle from "@/Utility/getSelectStyle";

export default function Edit({auth,departments,sections,roles,user,users}) {
    const { data, setData, put, processing,reset } = useForm({
        name: user.name,
        email: user.email,
        department_id: user.department_id,
        section_id: user.section_id,
        role: user.roles[0].name,
        old_role: user.roles[0].name,
    });

    console.log(user)

    const [errors, setErrors] = useState({});

    const roleOptions = roles.map((role) =>  ({
        value:role.name,
        label: role.name
    }));

    const departmentOptions = departments.map((department) =>  ({
        value:department.id,
        label: department.name
    }));
    const sectionOptions = sections.filter(item => item.department_id === data.department_id).map((section) =>  ({
        value:section.id,
        label: section.name
    }));

    // useEffect(() => {
    //     return () => {
    //         reset('password', 'password_confirmation');
    //     };
    // }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!data.name) {
            newErrors.name = "The name is required";
            isValid = false;
        }
        if (!data.email) {
            newErrors.email = "The email is required";
            isValid = false;
        }else{
            const emailExist = users.some((item) => item.email === data.email && (item.email != user.email));
            if(emailExist){
                newErrors.email = "The email has already been taken";
                isValid = false;
            }
        }
        if (!data.department_id) {
            newErrors.department_id = "The department is required";
            isValid = false;
        }
        if (!data.section_id) {
            newErrors.section_id = "The section is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                if(validateForm()){
                    put(route(`admin.user.update`,user.id),{
                        _method: 'PUT',
                        ...data
                    });
                }
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="User" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-1/3 shadow-md rounded-md flex flex-col">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Edit User : {user.name}</div>
                    <div className="p-5">
                        <div className="mb-5">
                            <InputLabel className="mb-1">Name</InputLabel>
                            <TextInput
                                placeholder="Name"
                                className="w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Email Address</InputLabel>
                            <TextInput
                                type="email"
                                placeholder="Email Address"
                                className="w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                />
                            <InputError message={errors.email} className="mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="mb-5">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Department</InputLabel>
                                <Select
                                    name="department_id"
                                    options={departmentOptions}
                                    isClearable={true}
                                    placeholder="Select Department"
                                    className="mt-1 block"
                                    value={departmentOptions.find((option) => option.value === data.department_id) || null}
                                    onChange={selectedOption => setData('department_id', selectedOption ? selectedOption.value : null)}
                                    styles={getSelectStyle()}
                                />
                                <InputError message={errors.department_id} className="mt-1" />
                            </div>
                            <div className="mb-5">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Section</InputLabel>
                                <Select
                                    name="section_id"
                                    options={sectionOptions}
                                    isClearable={true}
                                    placeholder="Select Section"
                                    className="mt-1 block"
                                    value={sectionOptions.find((option) => option.value === data.section_id) || null}
                                    onChange={selectedOption => setData('section_id', selectedOption ? selectedOption.value : null)}
                                    styles={getSelectStyle()}
                                />
                                <InputError message={errors.section_id} className="mt-1" />
                            </div>
                        </div>
                        
                        {/* <div className="mb-5">
                            <InputLabel className="mb-1">Password</InputLabel>
                            <TextInput
                                type="password"
                                placeholder="Password"
                                className="w-full"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                />
                            <InputError message={errors.password} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Confirm Password</InputLabel>
                            <TextInput
                                type="password"
                                placeholder="Password"
                                className="w-full"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div> */}
                        <div className="mb-5">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Role</InputLabel>
                            <Select
                                name="role"
                                options={roleOptions}
                                isClearable={true}
                                placeholder="Select Role"
                                className="mt-1 block"
                                value={roleOptions.find((option) => option.value === data.role) || null}
                                onChange={selectedOption => setData('role', selectedOption ? selectedOption.value : null)}
                                styles={getSelectStyle()}
                            />
                            <InputError message={errors.role} className="mt-1" />
                        </div>
                    </div>
            
                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.user.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
                            <span className="bi-x-lg"/>
                            <span>Cancel</span>
                        </Link>
                        <PrimaryButton className="gap-1" disabled={processing}>
                            <span className="bi-floppy"/>
                            <span>Save</span>
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    )
}