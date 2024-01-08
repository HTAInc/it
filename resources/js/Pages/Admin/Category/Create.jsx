import Filter from "@/Components/Filter";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useData } from "@/Utility/DataProvider";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import getSelectStyle from "@/Utility/getSelectStyle";
import Select from 'react-select';

export default function create({auth}) {
    const {categoryTypeData} = useData();
    const { data, setData, post, processing, errors } = useForm({
        type: '',
        name: '',
        code: '',
        installed_to_pc:'',
    });

    const typeOptions = categoryTypeData.map((type) =>  ({
        value: type.value,
        label: type.label
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
                post(route('admin.category.store'));
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Category" />
            <div className="flex justify-center">
                <form onSubmit={submit} className="bg-white w-full md:w-96 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Create New Category</div>
                    <div className="p-5">
                        <div className="mb-5">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Company</InputLabel>
                            <Select
                                name="type"
                                options={typeOptions}
                                isClearable={true}
                                placeholder="Select Type"
                                className="mt-1 block"
                                value={typeOptions.find(option => option.value === data.type)||null}
                                onChange={selectedOption => setData('type', selectedOption ? selectedOption.value : null)}
                                styles={getSelectStyle()}
                            />
                            <InputError message={errors.type} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Name</InputLabel>
                            <TextInput
                                placeholder="Category Name"
                                className="w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Code</InputLabel>
                            <TextInput
                                placeholder="Code"
                                className="w-full"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                />
                            <InputError message={errors.code} className="mt-1" />
                        </div>
                        <div className="mb-5">
                            <fieldset>
                                <InputLabel className="mb-1">Installed to PC</InputLabel>
                                <div className="flex space-x-5">
                                    <div className="flex items-center">
                                            <input id="yes" className="peer/yes" type="radio" value={true} name="installed_to_pc" onChange={(e) => setData('installed_to_pc',true)} checked={data.installed_to_pc === true}/>
                                            <label htmlFor="yes" className="peer-checked/yes:text-blue-600 ml-1">Yes</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="no" className="peer/no" type="radio" value={false} name="installed_to_pc" onChange={(e) => setData('installed_to_pc',false)} checked={data.installed_to_pc === false}/>
                                        <label htmlFor="no" className="peer-checked/no:text-blue-600 ml-1">No</label>
                                    </div>
                                </div>
                            </fieldset>
                            <InputError message={errors.installed_to_pc} className="mt-1" />
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.category.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500" >
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