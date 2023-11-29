import Filter from "@/Components/Filter";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import Select from 'react-select';

export default function create({auth, departments}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        department_id: ''
    });

    const departmentOptions = departments.map((department) => ({
        value:department.id,
        label:department.name,
    }))

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('admin.section.store'));
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Section" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-96 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Create New Section</div>
                    <div className="p-5">
                        <div className="mb-5">
                            <InputLabel className="mb-1">Department</InputLabel>
                            <Select
                                name="department_id"
                                options={departmentOptions}
                                isClearable={true}
                                placeholder="Select Department"
                                className="mt-1 block w-full"
                                value={departmentOptions.find(option => option.value === data.department_id)}
                                onChange={selectedOption => setData('department_id', selectedOption ? selectedOption.value : null)}
                            />
                            <InputError message={errors.department_id} className="mt-2" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Section</InputLabel>
                            <TextInput
                                placeholder="Section"
                                className="w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.section.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
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