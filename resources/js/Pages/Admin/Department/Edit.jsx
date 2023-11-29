import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from 'sweetalert2';

export default function create({auth,department}) {
    const { data, setData, put, processing, errors } = useForm({
        name: department.name,
        section: department.section,
    });

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                put(route(`admin.department.update`,department.id),{
                    _method: 'PUT',
                    ...data
                });
            }
        }); 
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Department" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-96 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Edit Department : {department.name}</div>
                    <div className="p-5">
                        <div className="mb-5">
                            <InputLabel className="mb-1">Department</InputLabel>
                            <TextInput
                                placeholder="Department"
                                className="w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.department.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
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