import Filter from "@/Components/Filter";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useData } from "@/Utility/DataProvider";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import Select from 'react-select';
import getSelectStyle from "@/Utility/getSelectStyle";

export default function create({auth}) {
    const {downtimeCategoryData} = useData();
    const { data, setData, post, processing, errors } = useForm({
        category: '',
        downtime: '',
        uptime: '',
        issue: '',
        remark: '',
    });

    const downtimeOptions = downtimeCategoryData.map((downtimeCategory) =>  ({
        value:downtimeCategory.value,
        label: downtimeCategory.label
    }));

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('admin.downtime.store'));
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="downtime" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-1/2 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Create New Downtime</div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="mb-5">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</InputLabel>
                                <Select
                                    name="category"
                                    options={downtimeOptions}
                                    isClearable={true}
                                    placeholder="Select Category"
                                    className="mt-1 block"
                                    value={downtimeOptions.find((option) => option.value === data.category) || null}
                                    onChange={selectedOption => setData('category', selectedOption ? selectedOption.value : null)}
                                    styles={getSelectStyle()}
                                />
                                <InputError message={errors.category} className="mt-1" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="mb-5">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Downtime</InputLabel>
                                <TextInput
                                    type="datetime-local"
                                    placeholder="downtime"
                                    className="w-full"
                                    value={data.downtime}
                                    onChange={(e) => setData('downtime', e.target.value)}
                                    />
                                <InputError message={errors.downtime} className="mt-1" />
                            </div>
                            <div className="mb-5">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Uptime</InputLabel>
                                <TextInput
                                    type="datetime-local"
                                    placeholder="uptime"
                                    className="w-full"
                                    value={data.uptime}
                                    onChange={(e) => setData('uptime', e.target.value)}
                                    />
                                <InputError message={errors.uptime} className="mt-1" />
                            </div>
                        </div>                     
                       
                        <div className="mb-5">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Issue</InputLabel>
                            <TextArea
                                placeholder="Input Issue"
                                className="w-full"
                                value={data.issue}
                                onChange={(e) => setData('issue', e.target.value)}
                                />
                            <InputError message={errors.issue} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Remark</InputLabel>
                            <TextArea
                                placeholder="Input Remark"
                                className="w-full"
                                value={data.remark}
                                onChange={(e) => setData('remark', e.target.value)}
                                />
                            <InputError message={errors.remark} className="mt-1" />
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.downtime.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
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