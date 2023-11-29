import Filter from "@/Components/Filter";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function create({auth,supplier}) {
    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
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
                put(route(`admin.supplier.update`,supplier.id),{
                    _method: 'PUT',
                    ...data
                });
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Supplier" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-1/4 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Edit Supplier : {supplier.name}</div>
                    <div className="p-5">
                        <div className="mb-5">
                            <InputLabel className="mb-1">Name</InputLabel>
                            <TextInput
                                placeholder="Name"
                                className="w-full"
                                value={data.name|| ''}
                                onChange={(e) => setData('name', e.target.value)}
                                />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Phone</InputLabel>
                            <TextInput
                                placeholder="Phone"
                                className="w-full"
                                value={data.phone|| ''}
                                onChange={(e) => setData('phone', e.target.value)}
                                />
                            <InputError message={errors.phone} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Email</InputLabel>
                            <TextInput
                                type="email"
                                placeholder="Email"
                                className="w-full"
                                value={data.email|| ''}
                                onChange={(e) => setData('email', e.target.value)}
                                />
                            <InputError message={errors.email} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">address</InputLabel>
                            <TextArea
                                placeholder="address"
                                className="w-full"
                                value={data.address || ''}
                                onChange={(e) => setData('address', e.target.value)}
                                />
                            <InputError message={errors.address} className="mt-1" />
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.supplier.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
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