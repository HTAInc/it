import IconButton from "@/Components/IconButton";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getFormatDate } from "@/Utility/getFormatDate";
import getSelectStyle from "@/Utility/getSelectStyle";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";

export default function Show({auth,device}) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const sortedData = device.transactions.slice().sort((a, b) => {
        return new Date(b.id) - new Date(a.id);
    });

    const columns = [
        {
            name:'No',
            width:'50px',
            selector: (_, index) => index + 1,
        },
        {
            name:'Date',
            selector:row => row.transaction_date,
            cell: row => getFormatDate(row.transaction_date),
            sortable: true,
        },
        {
            name:'Status',
            selector:row => row.status || '-',
            cell: row => (
                <div className={`px-3 py-1 text-xs text-white rounded uppercase ${row.status === 'Available'? 'bg-gray-500':row.status ==='Installed' ? 'bg-emerald-500' : row.status === 'Damaged' ? 'bg-rose-500' : 'bg-yellow-500'}`}>{row.status}</div>
            ),
            sortable: true,
        },
        {
            name:'Asset Name',
            selector:row => row.name || '-',
            sortable: true,
        },
        {
            name:'IP Address',
            selector:row => row.ip || '-',
            sortable: true,
        },
        {
            name:'Department',
            selector:row => row.department?.name || '-',
            sortable: true,
        },
        {
            name:'User',
            selector:row => row.user?.name || '-',
            sortable: true,
        },
        {
            name:'Note',
            selector:row => row.note || '-',
            sortable: true,
        },

    ]

    const tabs = [
        {
            title: 'Description',
            content:
            <div className="w-full">
                <div className="w-full max-h-[30rem] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-5"> 
                        <div className="mb-5">
                            <InputLabel className="mb-1">Serial No.</InputLabel>
                            <TextInput
                                placeholder="Serial No."
                                className="w-full bg-gray-100"
                                value={device.serial_number || ''}
                                />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Brand</InputLabel>
                            <TextInput
                                placeholder="Brand"
                                className="w-full bg-gray-100"
                                value={device.brand || ''}
                                />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Description</InputLabel>
                            <TextInput
                                placeholder="Description"
                                className="w-full bg-gray-100"
                                value={device.description || ''}
                                />
                        </div>
                    </div>
                    
                    {['CPU', 'Notebook', 'Tablet'].includes(device.category.name) && (
                        <div className="">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Processor Type</InputLabel>
                                    <TextInput
                                        placeholder="processor_type"
                                        className="w-full bg-gray-100"
                                        value={device.processor_type || ''}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Processor Description</InputLabel>
                                    <TextInput
                                        placeholder="processor_description"
                                        className="w-full bg-gray-100"
                                        value={device.processor_description || ''}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Ram Type</InputLabel>
                                    <TextInput
                                        placeholder="ram_type"
                                        className="w-full bg-gray-100"
                                        value={device.ram_type || ''}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Ram Capacity</InputLabel>
                                    <TextInput
                                        placeholder="ram_capacity"
                                        className="w-full bg-gray-100"
                                        value={device.ram_capacity || ''}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-800 font-semibold mb-3">Storage :</h1>
                                </div>
                                {device.asset_storage.map((storage, index) => {
                                    return (
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-3" key={index}>
                                        <div className="">
                                            <InputLabel className="mb-1">Type {index+1}</InputLabel>
                                            <TextInput
                                                placeholder="Storage Type"
                                                className="w-full bg-gray-100"
                                                disabled={true}
                                                value={storage.storage_type || ''}
                                            />
                                            
                                        </div>
                                        <div className="w-full flex items-center gap-3">
                                            <div className="w-full">
                                                <InputLabel className="mb-1">Capacity {index+1}</InputLabel>
                                                <TextInput
                                                    placeholder="Storage Type"
                                                    className="w-full bg-gray-100"
                                                    disabled={true}
                                                    value={storage.storage_capacity || ''}
                                                />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    )
                                })}
                            </div>

                            <div className="grid grid-cols-3 gap-5">
                                <div className="mb-5">
                                    <InputLabel className="mb-1">VGA Card</InputLabel>
                                    <TextInput
                                        placeholder="VGA Card"
                                        className="w-full bg-gray-100"
                                        disabled={true}
                                        value={device.vga_card || ''}
                                    />
                                </div>

                                <div className="mb-5">
                                    <InputLabel className="mb-1">OS Type</InputLabel>
                                    <TextInput
                                        placeholder="OS Type"
                                        className="w-full bg-gray-100"
                                        disabled={true}
                                        value={device.os_type || ''}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">OS Edition</InputLabel>
                                    <TextInput
                                        placeholder="OS Edition"
                                        className="w-full bg-gray-100"
                                        disabled={true}
                                        value={device.os_edition || ''}
                                    />
                                </div>
                                
                            </div>

                            <div className="grid grid-cols-3 gap-5">
                                <div className="mb-5">
                                    <InputLabel className="mb-1">OS Architecture</InputLabel>
                                    <TextInput
                                        placeholder="OS Edition"
                                        className="w-full bg-gray-100"
                                        disabled={true}
                                        value={device.os_architecture || ''}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">OS Licence</InputLabel>
                                    <TextInput
                                        placeholder="OS Licence"
                                        className="w-full bg-gray-100"
                                        disabled={true}
                                        value={device.os_licence || ''}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputLabel className="mb-1">Office Licence</InputLabel>

                                    <TextInput
                                        placeholder="Office Licence"
                                        className="w-full bg-gray-100"
                                        disabled={true}
                                        value={device.office_licence || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-5">   
                        <div className="mb-5">
                            <InputLabel className="mb-1">Purchase Date</InputLabel>
                            <TextInput
                                type="date"
                                className="w-full bg-gray-100"
                                disabled={true}
                                value={device.purchase_date || ''}
                            />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Waranty Expired Date</InputLabel>
                            <TextInput
                                type="date"
                                className="w-full bg-gray-100"
                                disabled={true}
                                value={device.warranty_expiry_date || ''}
                            />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Price</InputLabel>
                            <TextInput
                                className="w-full bg-gray-100"
                                disabled={true}
                                value={parseFloat(device.price).toLocaleString('US') || ''}
                            />
                        </div>
                        <div className="mb-5">
                            <InputLabel className="mb-1">Supplier</InputLabel>
                            <TextInput
                                className="w-full bg-gray-100"
                                disabled={true}
                                value={device.supplier.name || ''}
                            />
                        </div>       
                    </div>
                </div>
            </div>
        },
        {
            title: 'History',
            content:
            <div className="">
                <DataTable
                    data={sortedData}
                    columns={columns}
                    pagination
                />
            </div>
        }
    ]
    
    return (
        <Authenticated user={auth.user}>
            <Head title="Asset" />
            <div className="flex justify-center mb-10">
                <div className="bg-white w-full md:w-3/4 shadow-md rounded-md flex flex-col">
                    <div className="w-full flex justify-between px-5 py-3 border-b items-center">
                        <div className="w-full font-semibold text-rose-600 text-xl">Asset Details</div>
                        <IconButton onClick="" className="bi-download bg-rose-500 hover:bg-rose-600 active:bg-rose-600 focus:bg-rose-600 focus:ring-rose-600"/>
                    </div>
                    <div className="p-5 w-full grid grid-cols-4 gap-5 border-b-2">
                        <div className="">
                            <InputLabel className="mb-1">Company</InputLabel>
                            <TextInput
                                placeholder="Company"
                                className="w-full bg-gray-100"
                                value={device.company}
                                disabled={true}
                                />
                        </div>
                        <div className="">
                            <InputLabel className="mb-1">Category</InputLabel>
                            <TextInput
                                placeholder="Company"
                                className="w-full bg-gray-100"
                                value={device.category.name}
                                disabled={true}
                                />
                        </div>
                        <div className="">
                            <InputLabel className="mb-1">Budget</InputLabel>
                            <TextInput
                                placeholder="budget"
                                className="w-full bg-gray-100"
                                value={device.budget}
                                disabled={true}
                                />
                        </div>
                        <div className="">
                            <InputLabel className="mb-1">Inv. Code</InputLabel>
                            <TextInput
                                placeholder="Inv. Code"
                                className="w-full bg-gray-100"
                                value={device.code}
                                disabled={true}
                                />
                        </div>
                    </div>
                    <div className="w-full divide px-5 pt-3 space-x-8">
                        {tabs.map((tab,index) => (
                            <button key={index}
                            className={`py-2 text-gray-500 font-light text-sm uppercase ${index === activeTab && 'font-semibold text-rose-600 border-b-2 border-b-rose-600'}`}
                            onClick={() => handleTabClick(index)}>{tab.title}</button>
                        ))}
                    </div>
                    <div className="p-5">
                        {tabs[activeTab].content}
                    </div>
                    

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.device.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <span className="bi-x-lg"/>
                            <span>CLOSE</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}