import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useData } from "@/Utility/DataProvider";
import getSelectStyle from "@/Utility/getSelectStyle";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Select from 'react-select';
import Swal from "sweetalert2";

export default function Edit({auth,workOrder}) {
    const {categoryWO} = useData();
    const { data, setData, put, processing, errors } = useForm({
        category: '',
        action: '',
        other: '',
        done_at: '',
    });

    const categoryWOOptions = categoryWO.map((category) => ({
        value:category.value,
        label:category.label,
    }))

    useEffect(() => {
        if(data.category != 'OTHER'){
            setData({
                ...data,
                other : ''
            })
        }
    },[data.category]);

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                put(route(`admin.work-order.update`,workOrder.id),{
                    _method: 'PUT',
                    ...data
                });
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Work Order" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-1/2 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Done Work Order</div>
                    <div className="w-full p-5">
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            <div className="">
                                <InputLabel className="mb-1">Transaction No.</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    value={workOrder.code}
                                    disabled={true}
                                    />
                            </div>
                            <div className="">
                                <InputLabel className="mb-1">Asset Code</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    value={workOrder.device?.code}
                                    disabled={true}
                                    />
                            </div>
                            <div className="">
                                <InputLabel className="mb-1">Category</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    value={workOrder.device?.category?.name}
                                    disabled={true}
                                    />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="mb-5">
                                <InputLabel className="mb-1">User</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    value={workOrder.user.name}
                                    disabled={true}
                                    />
                            </div>
                            <div className="mb-5">
                                <InputLabel className="mb-1">Department</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    value={workOrder.user?.department?.name}
                                    disabled={true}
                                    />
                            </div>
                            <div className="mb-5">
                                <InputLabel className="mb-1">Section</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    value={workOrder.user.section?.name}
                                    disabled={true}
                                    />
                            </div>
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Request</InputLabel>
                            <TextArea
                                placeholder="Input Request"
                                className="w-full bg-gray-100"
                                value={workOrder.request}
                                disabled={true}
                                />
                            <InputError message={errors.request} className="mt-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="">
                                <InputLabel className="mb-1">PIC Name</InputLabel>
                                <TextInput
                                    className="w-full bg-gray-100"
                                    disabled={true}
                                    value={workOrder.pic?.name}
                                    />
                            </div>
                            <div className="">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Done At</InputLabel>
                                <TextInput
                                    type="datetime-local"
                                    value={data.done_at ||''}
                                    placeholder="Done At"
                                    className="w-full"
                                    onChange={(e) => setData('done_at', e.target.value)}
                                    />
                                <InputError message={errors.done_at} className="mt-1" />
                            </div>
                            
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</InputLabel>
                                <Select
                                    name="category"
                                    options={categoryWOOptions}
                                    isClearable={true}
                                    placeholder="Select category"
                                    className="mt-1 block"
                                    value={categoryWOOptions.find(option => option.value === data.category)||null}
                                    onChange={selectedOption => setData('category', selectedOption ? selectedOption.value : null)}
                                    styles={getSelectStyle()}
                                />
                                <InputError message={errors.category} className="mt-1" />
                            </div>
                            {data.category === 'OTHER' && (
                                <div className="">
                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Other</InputLabel>
                                    <TextInput
                                        value={data.other || ''}
                                        placeholder="Input Other"
                                        className="w-full"
                                        onChange={(e) => setData('other', e.target.value)}
                                        />
                                    <InputError message={errors.other} className="mt-1" />
                                </div>
                            )}
                        </div>
                        
                        
                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Action</InputLabel>
                            <TextArea
                                placeholder="Input Action"
                                className="w-full"
                                value={data.action || ''}
                                onChange={(e) => setData('action', e.target.value)}
                                />
                            <InputError message={errors.action} className="mt-1" />
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