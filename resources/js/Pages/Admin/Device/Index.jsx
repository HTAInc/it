import Filter from "@/Components/Filter";
import FlashMessage from "@/Components/FlashMessage";
import IconButton from "@/Components/IconButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useData } from "@/Utility/DataProvider";
import { getFormatDate } from "@/Utility/getFormatDate";
import getSelectStyle from "@/Utility/getSelectStyle";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import Swal from "sweetalert2";

export default function Index({auth,assets,users,departments,categories,flashMessage}) {
    const {statusAssetData} = useData();

    const [errors, setErrors] = useState({});
    const {data,setData,post, delete: destroy } = useForm({
        'modal': false,
        'device_id':'', 
        'code':'', 
        'company':'', 
        'category_id':'',
        'category':'',
        'status':'',
        'user_id':'',
        'department_id':'',
        'transaction_date':'',
        'name':'',
        'note':'',
        'id':'',
        'ip':'',
        'disabled':false,
        'asset_name':[],
        'update':false,
    });
    const [filterText, setFilterText] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    
    const handleFilter = e => {
        const value = e.target.value || '';
        setFilterText(value);
    };
    const handleClear = () => {
        setFilterText('');
    };

    const filteredData = assets.filter(item => {
        const textFilter = (
            item.code.toLowerCase().includes(filterText.toLowerCase()) ||
            item.category.name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.serial_number.toLowerCase().includes(filterText.toLowerCase()) ||
            item.brand.toLowerCase().includes(filterText.toLowerCase()) ||
            item.description.toLowerCase().includes(filterText.toLowerCase()) ||
            (
                item.last_transaction &&
                item.last_transaction.status &&
                item.last_transaction.status.toLowerCase().includes(filterText.toLowerCase())
            ) ||
            (
                item.last_transaction &&
                item.last_transaction.name &&
                item.last_transaction.name.toLowerCase().includes(filterText.toLowerCase())
            ) ||
            (
                item.last_transaction &&
                item.last_transaction.user &&
                item.last_transaction.user.name &&
                item.last_transaction.user.name.toLowerCase().includes(filterText.toLowerCase())
            )
        );
    
        const categoryFilter = (
            !filterCategory || item.category.name.toLowerCase().includes(filterCategory.toLowerCase())
        );
        const statusFilter = (
            !filterStatus || item.last_transaction.status.toLowerCase().includes(filterStatus.toLowerCase())
        );
    
        return textFilter && categoryFilter && statusFilter;
    });
    

    const handleEdit = (id) => {
        router.get(route('admin.device.edit',id));
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
                destroy(route('admin.device.destroy',id))
            }
        });
    };

    const statusOptions = statusAssetData.map((status) => ({
        value: status.value,
        label: status.label,
    }));

    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name,
        department: user.department_id,
    }));

    const departmentOptions = departments.map((department) => ({
        value: department.id,
        label: department.name,
    }));

    const assetNameOptions = data.asset_name.map((asset) => ({
        value: asset.name,
        label: asset.name,
    }));

    if (assetNameOptions.length > 1) {
        const lastOption = assetNameOptions[assetNameOptions.length - 1];
        assetNameOptions[assetNameOptions.length - 1] = {
            value: lastOption.value,
            label: `${lastOption.label} (NEW)`,
        };
    }

    const categoryOptions = categories.map((category) => ({
        value: category.name,
        label: category.name,
    }));

    function handleOpenModal(row) {
        setData({
            ...data,
            modal: true,
            device_id: row.id,
            company: row.company,
            category_id: row.category_id,
            category: row.category.name,
            code: row.code,
            id: row.last_transaction.id,
            status: row.last_transaction.status,
            ip: row.last_transaction.ip,
            user_id: row.last_transaction.user_id || '',
            department_id: row.last_transaction.department_id || '',
            transaction_date: row.last_transaction.transaction_date || '',
            note: row.last_transaction.note || '',
            name: row.last_transaction.name || '',
        });
    }

    function handleCloseModal(row) {
        setData({
            ...data,
            modal: false,
            device_id: '',
            company: '',
            category_id: '',
            category: '',
            code: '',
            id: '',
            status: '',
            ip: '',
            user_id: '',
            department_id: '',
            transaction_date: '',
            note: '',
            name: '',
            update:false
        });
    }

    const handleStatusChange = (selectedOption) => {
        setData({
          ...data,
          status: selectedOption.value,
          user_id: '',
          department_id: '',
          transaction_date: '',
          ip: '',
          note: '',
          name: '',
          update:true
        });
    };

    const handleUserChange = (selectedOption) => {
        const { value, label,department } = selectedOption || {};
        setData({
          ...data,
          user_id: value,
          department_id: department || '',
          update:true
        });
    };

    const handleDepartmentChange = (selectedOption) => {
        const { value, label } = selectedOption || {};
        setData({
          ...data,
          department_id: value,
          user_id: '',
          update:true
        });
    };

    useEffect(() => {
        if(data.status != 'Installed') {
            setData({
                ...data,
                disabled:true,
                asset_name:[],
            })
        }else{
            setData({
                ...data,
                disabled:false
            })
        }
    },[data.status])

    useEffect(() => {
        if (data.status ==='Installed' && data.update && data.company && data.category_id && data.department_id) {
            axios.get(`/admin/device/lastname/${data.status}/${data.company}/${data.category_id}/${data.department_id}`)
            .then(response => {
                const newData = response.data;
                if(newData.data.length === 1){
                    setData((prevData) => ({
                        ...prevData,
                        name: newData.data[0].name,
                        asset_name: [],
                    }));
                }else{
                    setData((prevData) => ({
                        ...prevData,
                        asset_name: newData.data,
                        name:''
                    }));
                }
            })
            .catch(error => {
                console.error('Error fetching last name:', error);
            });
        }
    }, [data.company, data.category_id, data.department_id]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (data.status === 'Installed' && ['CPU', 'Notebook', 'Tablet'].includes(data.category) && !data.user_id) {
            newErrors.user_id = "The user is required";
            isValid = false;
        }
        if (data.status === 'Installed' && !data.user_id && !data.department_id && ['CPU', 'Notebook', 'Tablet'].includes(data.category)) {
            newErrors.user_id = "The user is required";
            isValid = false;
        }
        if (data.status === 'Installed' && !data.department_id) {
            newErrors.department_id = "The department is required";
            isValid = false;
        }
        if (!data.transaction_date) {
            newErrors.transaction_date = "The transaction date is required";
            isValid = false;
        }
        if (data.status === 'Installed' && ['CPU', 'Notebook', 'Tablet'].includes(data.category) && !data.ip) {
            newErrors.ip = "The ip is required";
            isValid = false;
        }
        if (data.status === 'Installed' && !data.name) {
            newErrors.name = "The asset name date is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const submitStatusChange = (e) => {
        e.preventDefault();
        if(validateForm()) {
            Swal.fire({
                text: 'Simpan?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    post(route('admin.deviceTransaction.store'));
                    Swal.fire({
                        text: 'Successfully updated the device',
                        showConfirmButton: false,
                        icon: 'success',
                        timer: 1500,
                    });
                    handleCloseModal();
                }
                
            }); 
        }
    }

    const columns = [
        {
            name:'No',
            width:'50px',
            selector: (_, index) => index + 1,
        },
        {
            name:'Category',
            selector:row => row.category.name,
            cell: row => (
                <div
                    className={`text-white px-2 py-1 text-xs rounded
                        ${row.category.name === 'CPU' ? 'bg-rose-500 '
                        : row.category.name === 'Printer' ? 'bg-sky-500'
                        : row.category.name === 'Monitor' ? 'bg-yellow-500'
                        : row.category.name === 'Notebook' ? 'bg-violet-500'
                        : 'bg-emerald-500'}`}
                >
                    {row.category.name}
                </div>
            ),
            sortable: true,
        },
        {
            name:'Code',
            selector:row => row.code || '-',
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
                <button onClick={()=>handleOpenModal(row)} className={`px-2 py-1 text-xs text-white rounded ${row.last_transaction.status === 'Available'? 'bg-gray-500':row.last_transaction.status ==='Installed' ? 'bg-emerald-500' : row.last_transaction.status === 'Damaged' ? 'bg-rose-500' : 'bg-yellow-500'}`}>{row.last_transaction.status}</button>
            ),
            sortable: true,
        },
        {
            name:'Trans. Date',
            selector:row => row.last_transaction.transaction_date,
            cell:row => (
                <div className="">{getFormatDate(row.last_transaction.transaction_date)}</div>
            ),
            sortable: true,
        },
        
        {
            name:'Asset Name',
            selector:row => row.last_transaction.name || '-',
            sortable: true,
        },
        {
            name:'User',
            selector:row => row.last_transaction.user?.name || '-',
            sortable: true,
        },
        {
            name:'Note',
            selector:row => row.last_transaction?.note || '-',
            sortable: true,
        },
        {
            name:'Action',
            cell: row => (
                <div className="flex items-center gap-2">
                    <IconButton onClick={() => router.get(route('admin.device.show',row.id))} className="bi-eye bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600 focus:ring-sky-600"/>
                    <IconButton onClick={(e)=> handleEdit(row.id)} className="bi-pencil bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 focus:bg-yellow-600 focus:ring-yellow-600"/>
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
                    <div className="flex items-center w-full gap-3"> 
                        <Link href={route('admin.device.create')} className="bg-rose-500 py-[11px] hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-600 focus:ring-rose-500" >
                            <span className="bi-plus-lg"/>Add
                        </Link>
                        <Select
                            options={categoryOptions}
                            isClearable={true}
                            placeholder="Select Category"
                            className="block w-56"
                            styles={getSelectStyle()}
                            value={categoryOptions.find(option => option.value === filterCategory) || null}
                            onChange={(selectedOption) => setFilterCategory(selectedOption ? selectedOption.value : null)}
                        />
                        <Select
                            options={statusOptions}
                            isClearable={true}
                            placeholder="Select Status"
                            className="block w-56"
                            styles={getSelectStyle()}
                            value={statusOptions.find(option => option.value === filterStatus) || null}
                            onChange={(selectedOption) => setFilterStatus(selectedOption ? selectedOption.value : null)}
                        />
                    </div>
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
                <form onSubmit={submitStatusChange} className="">
                    <div className="w-full px-5 pt-5">
                        <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Code Asset</InputLabel>
                        <TextInput
                            placeholder="Code Asset"
                            className="w-full bg-gray-100"
                            value={data.code || ''}
                            disabled={true}
                            onChange={(e) => setData('code', e.target.value)}
                            />
                        <InputError message={errors.code} className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 w-full gap-5 p-5">
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</InputLabel>
                            <TextInput
                                placeholder="Category"
                                className="w-full bg-gray-100"
                                value={data.category || ''}
                                disabled={true}
                                onChange={(e) => setData('category', e.target.value)}
                                />
                            <InputError message={errors.category} className="mt-1" />
                        </div>
                       
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Status</InputLabel>
                            <Select
                                name="status"
                                options={statusOptions}
                                placeholder="Select Status"
                                className="mt-1 block"
                                value={statusOptions.find(option => option.value === data.status) ||''}
                                onChange={handleStatusChange}
                                styles={getSelectStyle()}
                            />
                            <InputError message={errors.status} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className={`mb-1 ${(['CPU', 'Notebook', 'Tablet'].includes(data.category) && data.status ==='Installed') && 'after:content-["*"] after:ml-0.5 after:text-red-500'}`}>User</InputLabel>
                            <Select
                                name="user_id"
                                options={userOptions}
                                isClearable={true}
                                placeholder="Select User"
                                className="mt-1 block"
                                value={userOptions.find((option) => option.value === data.user_id) || null}
                                onChange={handleUserChange}
                                styles={getSelectStyle()}
                                isDisabled={data.disabled}
                            />
                            <InputError message={errors.user_id} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className={`mb-1 ${data.status ==='Installed' && 'after:content-["*"] after:ml-0.5 after:text-red-500'}`}>Department</InputLabel>
                            <Select
                                name="department_id"
                                options={departmentOptions}
                                isClearable={true}
                                placeholder="Select Department"
                                className="mt-1 block"
                                value={departmentOptions.find(option => option.value === data.department_id) || null}
                                onChange={handleDepartmentChange}
                                styles={getSelectStyle()}
                                isDisabled={data.disabled}
                            />
                            <InputError message={errors.department_id} className="mt-1" />
                        </div>
                        <div className="w-full">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Transaction Date</InputLabel>
                            <TextInput
                                type="date"
                                placeholder="Transaction Date"
                                className="w-full"
                                value={data.transaction_date ||''}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                                />
                            <InputError message={errors.transaction_date} className="mt-1" />
                        </div>

                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Asset Name</InputLabel>
                            {data.asset_name.length === 0 ? (
                                <TextInput
                                    placeholder="Asset Name"
                                    className="w-full bg-gray-100"
                                    value={data.name ||''}
                                    disabled={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    />
                                ):(
                                <Select
                                    name="name"
                                    options={assetNameOptions}
                                    isClearable={true}
                                    placeholder="Select Asset Name"
                                    className="mt-1 block"
                                    value={assetNameOptions.find(option => option.value === data.name) || null}
                                    onChange={(selectedOption) => setData('name', selectedOption ? selectedOption.value : null)}
                                    styles={getSelectStyle()}
                                />
                            )}
                            <InputError message={errors.name} className="mt-1" />
                        </div>          

                        <div className="">
                            <InputLabel className={`mb-1 ${(['CPU', 'Notebook', 'Tablet'].includes(data.category) && data.status ==='Installed') && 'after:content-["*"] after:ml-0.5 after:text-red-500'}`}>IP Address</InputLabel>
                            <TextInput
                                placeholder="IP Address"
                                className={`w-full ${data.disabled && 'bg-gray-100'}`}
                                value={data.ip ||''}
                                disabled={data.disabled}
                                onChange={(e) => setData('ip', e.target.value)}
                                />
                            <InputError message={errors.ip} className="mt-1" />
                        </div>

                        <div className="">
                            <InputLabel className="mb-1">Note</InputLabel>
                            <TextInput
                                placeholder="Note"
                                className="w-full"
                                value={data.note ||''}
                                onChange={(e) => setData('note', e.target.value)}
                                />
                            <InputError message={errors.note} className="mt-1" />
                        </div>
                        
                    </div>
                    <div className="flex w-full gap-3 justify-end px-5 py-3 bg-gray-100 rounded-b-lg">
                        <button onClick={handleCloseModal} className="px-3 rounded-md text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
                        <PrimaryButton disabled={!data.update}>Save</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </Authenticated>
    )
}