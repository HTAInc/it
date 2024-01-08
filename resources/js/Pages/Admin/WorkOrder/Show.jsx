import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useData } from "@/Utility/DataProvider";
import { getFormatDate } from "@/Utility/getFormatDate";
import getSelectStyle from "@/Utility/getSelectStyle";
import { Head, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import Select from 'react-select';
import Swal from "sweetalert2";

export default function Show({auth,workOrder}) {
    const {categoryWO} = useData();
    const { data, setData, put, processing, errors } = useForm({
        code: workOrder.code,
        created_at : getFormatDate(workOrder.created_at,"yyyy-MM-dd"),
        pic: workOrder.pic.name,
        created_time : getFormatDate(workOrder.created_at,"HH:mm"),
        done_time : workOrder.done_at ? getFormatDate(workOrder.done_at,"HH:mm"):'',
        asset_code: workOrder.device.code,
        asset_category: workOrder.device.category.name,
        user: workOrder.user.name,
        department: workOrder.user.department.name,
        section: workOrder.user.section.name,
        request: workOrder.request,
        action: workOrder.action,
        category:workOrder.category,
        other: workOrder.other,
    });

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
                <form onSubmit={submit} className="bg-white w-full md:w-3/4 shadow-md rounded-md flex flex-col overflow-hidden">
                    <div className="flex justify-between px-5 border-x-0 border-t-0 border-double border-4 border-gray-300 items-center">
                        <div className="flex items-center gap-3 border-r border-gray-300 py-2 pr-10">
                            <img src="/assets/logo-ARSI.png" alt="" className="h-10"/>
                            <div className="">
                                <div className="uppercase text-gray-800 underline font-bold">PT ARAI RUBBER SEAL INDONESIA</div>
                                <div className="text-gray-700 ">IT Department</div>
                            </div>
                        </div>
                        <div className="text-gray-900 font-bold grow text-center text-4xl border-gray-300">WORK ORDER</div>
                        <div className="flex items-end pl-10 flex-col justify-center border-l py-2">
                            <div className="">Nomor Record</div>
                            <div className="text-gray-800 font-semibold">{data.code}</div>
                        </div>
                    </div>
                    <div className="w-full p-5">
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div className="w-full">
                                <div className="flex items-center gap-3 mb-5">
                                    <InputLabel className="w-1/5">Tanggal</InputLabel>
                                    <div className="flex items-center gap-3 w-4/5">
                                        <div className="">:</div>
                                        <TextInput
                                            type="date"
                                            className="w-full bg-gray-50"
                                            value={data.created_at}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-5">
                                    <InputLabel className="w-1/5">IT</InputLabel>
                                    <div className="flex items-center gap-3 w-4/5">
                                        <div className="">:</div>
                                        <TextInput
                                            className="w-full bg-gray-50"
                                            value={data.pic}
                                            disabled={true}
                                            />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-5">
                                    <InputLabel className="w-1/5">Waktu</InputLabel>
                                    <div className="flex w-4/5 gap-3 items-center">
                                        <div className="">:</div>
                                        <TextInput
                                            type="time"
                                            className="w-full bg-gray-50"
                                            value={data.created_time}
                                            disabled={true}
                                            />
                                        <div className="">s/d</div>
                                        <TextInput
                                            type="time"
                                            className="w-full bg-gray-50"
                                            value={data.done_time}
                                            disabled={true}
                                            />
                                    </div>
                                </div>
                            </div>
                           <div className="w-full">
                                <div className="flex items-center gap-3 mb-5">
                                    <InputLabel className="w-1/5">Kode Peralatan</InputLabel>
                                    <div className="flex items-center gap-3 w-4/5">
                                        <div className="">:</div>
                                        <TextInput
                                            className="w-full bg-gray-50"
                                            value={data.asset_code}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-5">
                                    <InputLabel className="w-1/5">Kategori Peralatan</InputLabel>
                                    <div className="flex items-center gap-3 w-4/5">
                                        <div className="">:</div>
                                        <TextInput
                                            className="w-full bg-gray-50"
                                            value={data.asset_category}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-5">
                                    <InputLabel className="w-1/5">User</InputLabel>
                                    <div className="flex items-center gap-3 w-4/5">
                                        <div className="">:</div>
                                        <TextInput
                                            className="w-full bg-gray-50"
                                            value={data.user}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <InputLabel className="w-1/5">Department</InputLabel>
                                    <div className="flex w-4/5 gap-3 items-center">
                                        <div className="">:</div>
                                        <TextInput
                                            className="w-full bg-gray-50"
                                            value={data.department}
                                            disabled={true}
                                            />
                                        <TextInput
                                            className="w-full bg-gray-50"
                                            value={data.section}
                                            disabled={true}
                                            />
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1 text-gray-800 font-semibold">Support Request :</InputLabel>
                            <TextArea
                                placeholder="Input Request"
                                className="w-full bg-gray-50"
                                value={data.request}
                                disabled={true}
                                />
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-between items-center mb-2">
                                <InputLabel className="mb-1 text-gray-800 font-semibold">Tindakan :</InputLabel>
                                <div className="flex justify-arround space-x-5 items-center">
                                    {categoryWO.map((category, i) => (
                                        <InputLabel class="peer flex items-center" key={category.value}>
                                            <Checkbox disabled={true} className="mr-1 mb-1" checked = {category.value === data.category}/>{category.label}
                                        </InputLabel>
                                    ))}
                                    <TextInput value={data.other} placeholder="Other" className="h-8 bg-gray-50" disabled={true}/>
                                </div>
                            </div>
                            <TextArea
                                placeholder="Request"
                                className="w-full bg-gray-50"
                                value={data.action}
                                disabled={true}
                                />
                        </div>                        
                        
                        <div className="">
                            <InputLabel className="mb-1 text-gray-800 font-semibold">Sparepart yang dganti :</InputLabel>
                            <TextArea
                                placeholder="Input Action"
                                className="w-full bg-gray-50"
                                value={data.action}
                                disabled={true}
                                />
                        </div>
                        
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-3 flex items-center space-x-3 justify-end">
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