import Filter from "@/Components/Filter";
import FlashMessage from "@/Components/FlashMessage";
import IconButton from "@/Components/IconButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getFormatDate } from "@/Utility/getFormatDate";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Select from 'react-select';
import getSelectStyle from "@/Utility/getSelectStyle";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Index({auth,assets,users,departments,flashMessage}) {
    const {data,setData, get,delete: destroy,errors } = useForm({
        'modal': false,
        'asset_id':'', 
        'code':'', 
        'category':'',
        'status':'',
        'user_id':'',
        'department_id':'',
        'transaction_date':'',
        'name':'',
        'note':'',
        'disabled':false
    });
    const [filterText, setFilterText] = useState('');
    
    const handleFilter = e => {
        const value = e.target.value || '';
        setFilterText(value);
    };
    const handleClear = () => {
        setFilterText('');
    };

    const filteredData = assets.filter(item =>
        item.code.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleEdit = (id) => {
        get(route('admin.asset.edit',id));
    }

    function handleDelete(id) {
        Swal.fire({
            text: 'Yakin Ingin Hapus?',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton:false,
            denyButtonText: 'Hapus',
        }).then((result) => {
            if (result.isDenied) {
                destroy(route('admin.asset.destroy',id))
            }
        });
    };

    const selectStyle = getSelectStyle();

    const statusOptions = [
        {value: 'Available', label: 'Available'},
        {value: 'Installed', label: 'Installed'},
        {value: 'Damaged', label: 'Damaged'},
        {value: 'Under Repair', label: 'Under Repair'},
    ];

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name,
        department: user.department_id,
    }));

    const departmentOptions = departments.map((department) => ({
        value: department.id,
        label: department.name,
    }));

    function handleOpenModal(row) {
        setData({
            ...data,
            modal: true,
            asset_id: row.id,
            category: row.category.name,
            code: row.code,
            status: row.status,
            user_id: row.asset_transaction[0]?.user_id || '',
            department_id: row.asset_transaction[0]?.department_id,
            transaction_date: row.asset_transaction[0]?.transaction_date,
            note: row.asset_transaction[0]?.note,
            name: row.asset_transaction[0]?.name,
        });
    }

    function handleCloseModal(row) {
        setData({
            ...data,
            modal: false,
            asset_id: '',
            category: '',
            code: '',
            status: '',
            user_id: '',
            department_id: '',
            transaction_date: '',
            note: '',
            name: '',
        });
    }

    const handleUserChange = (selectedOption) => {
        const { value, label,department } = selectedOption || {};
        setData({
          ...data,
          user_id: value,
          department_id: department || '',
        });
    };

    const handleDepartmentChange = (selectedOption) => {
        const { value, label } = selectedOption || {};
        setData({
          ...data,
          department_id: value,
          user_id: '',
        });
    };

    useEffect(() => {
        if(data.status != 'Installed') {
            setData({
                ...data,
                user_id:'',
                department_id:'',
                transaction_date:'',
                note:'',
                name:'',
                disabled:true
            })
        }else{
            setData({
                ...data,
                disabled:false
            })
        }
    },[data.status])

    const columns = [
        {
            name:'No',
            width:'50px',
            selector: (_, index) => index + 1,
        },
        {
            name:'Company',
            selector:row => row.company || '-',
            sortable: true,
        },
        {
            name:'Category',
            selector:row => row.category.name || '-',
            sortable: true,
        },
        {
            name:'Code',
            selector:row => row.code || '-',
            sortable: true,
        },
        
        {
            name:'Serial Number',
            selector:row => row.serial_number || '-',
            sortable: true,
        },
        {
            name:'Brand',
            selector:row => row.brand || '-',
            sortable: true,
        },
        {
            name:'Description',
            selector:row => row.description || '-',
            sortable: true,
        },
        {
            name:'Purch. Date',
            selector:row => row.purchase_date,
            cell:row => (
                <div className="">{getFormatDate(row.purchase_date)}</div>
            ),
            sortable: true,
        },
        {
            name:'Waranty Exp. Date',
            selector:row => row.warranty_expiry_date | '-',
            cell:row => (
                <div className="">{row.warranty_expiry_date ? getFormatDate(row.warranty_expiry_date) : '-'}</div>
            ),
            sortable: true,
        },
        {
            name:'Price (Rp.)',
            selector:row => row.price || '-',
            cell:row => (
                <div className="">{parseFloat(row.price).toLocaleString('US')}</div>
            ),
            sortable: true,
        },
        {
            name:'Status',
            selector:row => row.status || '-',
            cell:row => (
                <button onClick={()=>handleOpenModal(row)} className={`px-3 py-1 text-xs text-white rounded ${row.status === 'Available'? 'bg-gray-500':row.status ==='Installed' ? 'bg-emerald-500' : row.status === 'Damaged' ? 'bg-rose-500' : 'bg-yellow-500'}`}>{row.status}</button>
            ),
            sortable: true,
        },
        {
            name:'Asset Name',
            selector:row => row.asset_transaction[0]?.name || '-',
            sortable: true,
        },
        {
            name:'Department',
            selector:row => row?.asset_transaction[0]?.department?.code || '-',
            sortable: true,
        },
        {
            name:'User',
            selector:row => row?.asset_transaction[0]?.user?.name || '-',
            sortable: true,
        },
        {
            name:'Action',
            cell: row => (
                <div className="flex items-center gap-3">
                    <IconButton onClick={()=> handleEdit(row.id)} className="bi-eye bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600 focus:ring-sky-600"/>
                    <IconButton onClick={()=> handleEdit(row.id)} className="bi-pencil bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 focus:bg-yellow-600 focus:ring-yellow-600"/>
                    <IconButton onClick={()=> handleDelete(row.id)} className="bi-trash bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:ring-gray-600"/>
                </div>
            )
        }
    ]

    return (
        <Authenticated user={auth.user}>
            <Head title="Assets" />
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
            )}
            <div className="w-full">
                <div className="flex justify-between mb-3">
                    <Link href={route('admin.asset.create')} className="bg-rose-500 hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-600 focus:ring-rose-500" >
                        <span className="bi-plus-lg"/>Add
                    </Link>
                    <Filter filterText={filterText} onFilter={handleFilter} onClear={handleClear}/>
                </div>
                <div className="bg-white p-3">
                    <DataTable
                        title="Assets"
                        data={filteredData}
                        columns={columns}
                        pagination
                    />
                </div>
            </div>
            <Modal show={data.modal} onClose={handleCloseModal}>
                <form action="" className="">
                    <div className="grid grid-cols-2 w-full gap-5 p-5">
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</InputLabel>
                            <TextInput
                                placeholder="Category"
                                className="w-full bg-gray-100"
                                value={data.category}
                                disabled={true}
                                onChange={(e) => setData('category', e.target.value)}
                                />
                            <InputError message={errors.category} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Code Asset</InputLabel>
                            <TextInput
                                placeholder="Code Asset"
                                className="w-full bg-gray-100"
                                value={data.code}
                                disabled={true}
                                onChange={(e) => setData('code', e.target.value)}
                                />
                            <InputError message={errors.code} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Status</InputLabel>
                            <Select
                                name="status"
                                options={statusOptions}
                                isClearable={true}
                                placeholder="Select Status"
                                className="mt-1 block"
                                value={statusOptions.find(option => option.value === data.status)}
                                onChange={selectedOption => setData('status', selectedOption ? selectedOption.value : null)}
                                styles={selectStyle}
                            />
                            <InputError message={errors.status} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className="mb-1">User</InputLabel>
                            <Select
                                name="user_id"
                                options={userOptions}
                                isClearable={true}
                                placeholder="Select User"
                                className="mt-1 block"
                                value={userOptions.find((option) => option.value === data.user_id) || null}
                                onChange={handleUserChange}
                                styles={selectStyle}
                                isDisabled={data.disabled}
                            />
                            <InputError message={errors.user_id} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Department</InputLabel>
                            <Select
                                name="department_id"
                                options={departmentOptions}
                                isClearable={true}
                                placeholder="Select Department"
                                className="mt-1 block"
                                value={departmentOptions.find(option => option.value === data.department_id) || null}
                                onChange={handleDepartmentChange}
                                styles={selectStyle}
                                isDisabled={data.disabled}
                            />
                            <InputError message={errors.department_id} className="mt-1" />
                        </div>
                    
                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Date</InputLabel>
                            <TextInput
                                type="date"
                                placeholder="Date"
                                className="w-full"
                                value={data.transaction_date}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                                />
                            <InputError message={errors.transaction_date} className="mt-1" />
                        </div>
                        
                        <div className="">
                            <InputLabel className="mb-1">Note</InputLabel>
                            <TextInput
                                placeholder="Note"
                                className="w-full"
                                value={data.note}
                                onChange={(e) => setData('note', e.target.value)}
                                />
                            <InputError message={errors.note} className="mt-1" />
                        </div>
                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Asset Name</InputLabel>
                            <TextInput
                                placeholder="Asset Name"
                                className="w-full bg-gray-100"
                                value={data.name}
                                disabled={true}
                                onChange={(e) => setData('name', e.target.value)}
                                />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                    </div>
                    <div className="flex w-full gap-5 justify-end px-5 py-3 bg-gray-100 rounded-b-lg">
                        <PrimaryButton>Save</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </Authenticated>
    )
}