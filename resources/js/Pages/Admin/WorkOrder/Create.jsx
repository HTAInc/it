import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Select from 'react-select';
import Swal from "sweetalert2";

export default function create({auth,user,devices}) {
    const { data, setData, post, processing, errors } = useForm({
        request: '',
    });

    const deviceOptions = devices.map((device) => ({
        value:device.id,
        label:device.last_transaction.name,
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
                post(route('admin.work-order.store'));
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Work Order" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-1/2 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Create New Work Order</div>
                    <div className="w-full p-5">
                           <div className="grid grid-cols-3 gap-3">
                                <div className="mb-5">
                                    <InputLabel className="mb-1">User</InputLabel>
                                    <TextInput
                                        className="w-full bg-gray-100"
                                        value={user.name}
                                        disabled={true}
                                        />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Department</InputLabel>
                                    <TextInput
                                        className="w-full bg-gray-100"
                                        value={user.department.name}
                                        disabled={true}
                                        />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Section</InputLabel>
                                    <TextInput
                                        className="w-full bg-gray-100"
                                        value={user.section.name}
                                        disabled={true}
                                        />
                                </div>
                            </div>
                            <div className="mb-5">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Kode Asset</InputLabel>
                                <Select
                                    name="device_id"
                                    options={deviceOptions}
                                    isClearable={true}
                                    placeholder="Select Asset"
                                    className="mt-1 block w-full"
                                    value={deviceOptions.find(option => option.value === data.device_id)}
                                    onChange={selectedOption => setData('device_id', selectedOption ? selectedOption.value : null)}
                                />
                                <InputError message={errors.device_id} className="mt-2" />
                            </div>
                            <div className="">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Request</InputLabel>
                                <TextArea
                                    placeholder="Input Request"
                                    className="w-full"
                                    value={data.request}
                                    onChange={(e) => setData('request', e.target.value)}
                                    />
                                <InputError message={errors.request} className="mt-1" />
                            </div>
                            
                        </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.work-order.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
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