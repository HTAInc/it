import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import getSelectStyle from "@/Utility/getSelectStyle";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select';
import Swal from "sweetalert2";
import { format, subYears } from 'date-fns';
import { useData } from "@/Utility/DataProvider";
import DataTable from "react-data-table-component";
import { getFormatDate } from "@/Utility/getFormatDate";
import IconButton from "@/Components/IconButton";
import Modal from "@/Components/Modal";

export default function Edit({auth,categories,suppliers,users,departments,devices,device}) {
    const {
        companyData,
        processorData,
        ramTypeData,
        ramCapacityData,
        storageTypeData,
        storageCapacityData,
        osTypeData,
        osEditionData,
        osArchitectureData,
        statusAssetData
    } = useData();

    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const sortedData = device.transactions.slice().sort((a, b) => {
        return new Date(b.id) - new Date(a.id);
    });
    
    const defaultStorage = { storage_type: "", storage_capacity: ""};
    const [errors, setErrors] = useState({});
    const { data, setData, put, processing,delete: destroy } = useForm({
        company: device.company,
        category_id: device.category_id,
        budget: device.budget,
        category_name: device.category.name,
        code: device.code,
        serial_number: device.serial_number,
        brand: device.brand,
        description: device.description,
        processor_type: device.processor_type,
        processor_description: device.processor_description,
        ram_type: device.ram_type,
        ram_capacity: device.ram_capacity,
        storages: device.asset_storage.map(storage => ({
            storage_type: storage.storage_type,
            storage_capacity: storage.storage_capacity,
        })),
        vga_card: device.vga_card,
        os_type: device.os_type,
        os_edition: device.os_edition,
        os_architecture: device.os_architecture,
        os_licence: device.os_licence,
        office_licence: device.office_licence,
        purchase_date: device.purchase_date,
        warranty_expiry_date: device.warranty_expiry_date,
        price: device.price,
        supplier_id: device.supplier_id,

        'modal': false,
        'update':false,
        'transaction_id':'', 
        'device_id':'', 
        'status':'',
        'user_id':'',
        'department_id':'',
        'transaction_date':'',
        'name':'',
        'note':'',
        'ip':'',
        'disabled':false,
        'asset_name':[],

    });

    const selectStyle = getSelectStyle();

    const companyOptions = companyData.map((company) =>  ({
        value:company.value,
        label: company.label
    }));

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const lastFiveYears = Array.from({ length: 5 }, (_, index) =>
        format(subYears(new Date(), index), 'yyyy')
    );

    const budgetOptions = lastFiveYears.map(year => ({
        value: year,
        label: year,
    }));

    const processorOptions = processorData.map((processor) => ({
        value:processor.value,
        label:processor.label
    }));

    const ramTypeOptions = ramTypeData.map((ramType) => ({
        value:ramType.value,
        label:ramType.label
    }));
    
    const ramCapacityOptions = ramCapacityData.map((ramCapacity) => ({
        value:ramCapacity.value,
        label:ramCapacity.label
    }));
    
    const storageTypeOptions = storageTypeData.map((storageType) => ({
        value:storageType.value,
        label:storageType.label,
    }));

    const storageCapacityOptions = storageCapacityData.map((storageCapacity) => ({
        value:storageCapacity.value,
        label:storageCapacity.label,
    }));

    const osTypeOptions = osTypeData.map((osType) => ({
        value:osType.value,
        label:osType.label,
    }));

    const osEditionsOptions = Object.fromEntries(
        Object.entries(osEditionData).map(([os, editions]) => [os, editions])
    );

    const getEditionOptions = () => {
        return data.os_type && osEditionsOptions[data.os_type]?.map((edition) => ({ value: edition, label: edition })) || [];
    };

    const osArchitectureOptions = osArchitectureData.map((osArchitecture) => ({
        value: osArchitecture.value,
        label: osArchitecture.label
    }));

    const supplierOptions = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
    }));

    const handleCompanyChange = (selectedOption) => {
        const { value } = selectedOption || {};
        setData({
            ...data,
            company: value,
        });
    
        fetchLastCode(value,data.category_id,data.budget);
    };
    
    const handleCategoryChange = (selectedOption) => {
        const { value, label } = selectedOption || {};
        setData({
          ...data,
          category_id: value,
          category_name: label,
        });
    
        fetchLastCode(data.company, value,data.budget);
    };

    const handleBudgetChange = (selectedOption) => {
        const { value } = selectedOption || {};
        setData({
            ...data,
            budget: value,
        });
    
        fetchLastCode(data.company,data.category_id,value);
    };
    

    const fetchLastCode = async (selectedCompany, selectedCategory, selectedBudget) => {
        if ((selectedCompany != device.company) && selectedCompany && selectedCategory && selectedBudget) {
            try {
                const response = await axios.get(`/admin/device/lastcode/${selectedCompany}/${selectedCategory}/${selectedBudget}`);
                const newCode = response.data;
                setData((prevData) => ({
                    ...prevData,
                    code: newCode.lastCode,
                }));
            } catch (error) {
                console.error('Error fetching last code:', error);
            }
        }else{
            setData((prevData) => ({
                ...prevData,
                code: device.code,
            }));
        }
        
    };

    const handleOsTypeChange = (selectedOption) => {
        const { value, label } = selectedOption || {};
        setData({
          ...data,
          os_type: value,
          os_edition: '',
        });
    };

    const handleAddStorage = () => {
        setData("storages", [...data.storages, defaultStorage]);
    };
      
    const handleRemoveStorage = (index) => {
        const updatedStorages = [...data.storages];
        updatedStorages.splice(index, 1);
        setData("storages", updatedStorages);
    };
      
    const handleStorageChange = (index, field, value) => {
        const updatedStorages = [...data.storages];
        updatedStorages[index][field] = value;
        setData("storages", updatedStorages);
    };

    useEffect(() => {
        if ((!data.company || !data.category_id)) {
            setData((prevData) => ({
                ...prevData,
                code: '',
            }));
        } else {
            fetchLastCode(data.company, data.category_id);
        }
    }, [data.company, data.category_id]);
    
    useEffect(() => {
        if (!(['CPU','Notebook','Tablet'].includes(data.category_name))) {
            setData((prevData) => ({
                ...prevData,
                processor_type: '',
                processor_description: '',
                ram_type: '',
                ram_capacity: '',
                storage_type: '',
                storage_capacity: '',
                vga_card: '',
                os_type: '',
                os_edition: '',
                os_architecture: '',
            }));
        }
    }, [data.category_name]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!data.company) {
            newErrors.company = "The company is required";
            isValid = false;
        }
        if (!data.category_id) {
            newErrors.category_id = "The category is required";
            isValid = false;
        }
        if (!data.budget) {
            newErrors.budget = "The budget is required";
            isValid = false;
        }
        if (!data.serial_number) {
            newErrors.serial_number = "The serial number is required";
            isValid = false;
        }else {
            const serialExists = devices.some((item) => item.serial_number === data.serial_number && (item.serial_number != device.serial_number));
            if (serialExists) {
                newErrors.serial_number = "The serial number has already been taken";
                isValid = false;
            }
        }
        if (!data.brand) {
            newErrors.brand = "The brand is required";
            isValid = false;
        }
        if (!data.description) {
            newErrors.description = "The brand is required";
            isValid = false;
        }
        if (!data.processor_type && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.processor_type = "The processor type is required";
            isValid = false;
        }
        if (!data.processor_description && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.processor_description = "The processor description is required";
            isValid = false;
        }
        if (!data.ram_type && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.ram_type = "The ran type is required";
            isValid = false;
        }
        if (!data.ram_capacity && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.ram_capacity = "The ram capacity is required";
            isValid = false;
        }
        if (!data.vga_card && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.vga_card = "The VGA card is required";
            isValid = false;
        }
        if (!data.os_type && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.os_type = "The OS type is required";
            isValid = false;
        }
        if (!data.os_edition && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.os_edition = "The OS edition is required";
            isValid = false;
        }
        if (!data.os_architecture && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            newErrors.os_architecture = "The OS architecture is required";
            isValid = false;
        }
        if (data.os_licence && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            const osLicenceExists = devices.some((item) => item.os_licence === data.os_licence);
            if (osLicenceExists) {
                newErrors.os_licence = "The os licence has already been taken.";
                isValid = false;
            }
            newErrors.purchase_date = "The purchase date is required";
            isValid = false;
        }
        if (data.office_licence && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            const officeLicenceExists = devices.some((item) => item.office_licence === data.office_licence && (item.office_licence != device.office_licence));
            if (officeLicenceExists) {
                newErrors.office_licence = "The office licence has already been taken.";
                isValid = false;
            }
            newErrors.purchase_date = "The purchase date is required";
            isValid = false;
        }
        if (!data.purchase_date) {
            newErrors.purchase_date = "The purchase date is required";
            isValid = false;
        }
        if (!data.price) {
            newErrors.price = "The price is required";
            isValid = false;
        }
        if (!data.supplier_id) {
            newErrors.supplier_id = "The supplier is required";
            isValid = false;
        }
        if (data.storages  && ['CPU', 'Notebook', 'Tablet'].includes(data.category_name)) {
            const storageErrors = data.storages.map((storage, index) => {
                const storageErrors = {};
                if (!storage.storage_type) {
                    storageErrors.storage_type = "The storage type is required";
                    isValid = false;
                }
                if (!storage.storage_capacity) {
                    storageErrors.storage_capacity = "The storage capacity is required";
                    isValid = false;
                }
                return storageErrors;
            });
            newErrors.storages = storageErrors;
        }
        
        setErrors(newErrors);
        return isValid;
    }

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                if(validateForm()){
                    put(route('admin.device.update',device.id),{
                        _method: 'PUT',
                        ...data
                    });
                }
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
          update:true,
        });
    };

    const handleUserChange = (selectedOption) => {
        const { value, label,department } = selectedOption || {};
        setData({
          ...data,
          user_id: value,
          department_id: department || '',
          update:true,
        });
    };

    const handleDepartmentChange = (selectedOption) => {
        const { value, label } = selectedOption || {};
        setData({
          ...data,
          department_id: value,
          user_id: '',
          update:true,
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
                destroy(route('admin.deviceTransaction.destroy',id))
                Swal.fire({
                    text: 'Successfully deleted',
                    showConfirmButton: false,
                    icon: 'success',
                    timer: 1500,
                });
            }
        });
    };

    function handleOpenModal(row) {
        setData({
            ...data,
            modal: true,
            transaction_id:row.id,
            device_id: row.device_id,
            status: row.status,
            ip: row.ip,
            user_id: row.user_id || '',
            department_id: row.department_id || '',
            transaction_date: row.transaction_date || '',
            note: row.note || '',
            name: row.name || '',
        });
    }

    function handleCloseModal() {
        setData({
            ...data,
            modal: false,
            transaction_id:'',
            device_id: '',
            status: '',
            ip: '',
            user_id: '',
            department_id: '',
            transaction_date: '',
            note: '',
            name: '',
            update:false,
        });
    }

    const validateForm2 = () => {
        let isValid = true;
        const newErrors = {};
        if (data.status === 'Installed' && ['CPU', 'Notebook', 'Tablet'].includes(data.category) && !data.user_id) {
            newErrors.user_id = "The user is required";
            isValid = false;
        }
        if (data.status === 'Installed' && !data.user_id && !data.department_id) {
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
        if(validateForm2()) {
            Swal.fire({
                text: 'Simpan?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    put(route('admin.deviceTransaction.update',data.transaction_id),{
                        _method: 'PUT',
                        ...data
                    });
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
        {
            name:'Action',
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <IconButton onClick={()=>handleOpenModal(row)} className="bi-pencil bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 focus:bg-yellow-600 focus:ring-yellow-600"/>
                    <IconButton onClick={()=> handleDelete(row.id)} className="bi-trash bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:ring-gray-600"/>
                </div>
            ),
        },

    ]

    const tabs = [
        {
            title: 'Description',
            content:
            <form onSubmit={submit}>
                <div className="">
                    <div className="mb-5 border-b pb-5 w-full grid grid-cols-3 gap-5">
                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Company</InputLabel>
                            <Select
                                name="company"
                                options={companyOptions}
                                isClearable={true}
                                isDisabled={true}
                                placeholder="Select Company"
                                className="mt-1 block"
                                value={companyOptions.find(option => option.value === data.company)}
                                onChange={handleCompanyChange}
                                styles={selectStyle}
                            />
                            <InputError message={errors.company} className="mt-1" />
                        </div>
                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</InputLabel>
                            <Select
                                name="category_id"
                                options={categoryOptions}
                                isClearable={true}
                                isDisabled={true}
                                placeholder="Select Category"
                                className="mt-1 block"
                                value={categoryOptions.find(option => option.value === data.category_id)}
                                onChange={handleCategoryChange}
                                styles={selectStyle}
                            />
                            <InputError message={errors.category_id} className="mt-1" />
                        </div>
                        <div className="">
                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Budget</InputLabel>
                            <Select
                                name="budget"
                                options={budgetOptions}
                                isClearable={true}
                                isDisabled={true}
                                placeholder="Select Budget"
                                className="mt-1 block"
                                value={budgetOptions.find(option => option.value == data.budget)}
                                onChange={handleBudgetChange}
                                styles={selectStyle}
                            />
                            <InputError message={errors.budget} className="mt-1" />
                        </div>
                    </div>
                    
                    {data.category_name ? (
                        <div className="w-full">
                            <div className="">
                                <div className="w-full">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Inv. Code</InputLabel>
                                            <TextInput
                                                placeholder="Inv. Code"
                                                className="w-full bg-gray-100"
                                                value={data.code}
                                                disabled={true}
                                                onChange={(e) => setData('code', e.target.value)}
                                                />
                                            <InputError message={errors.code} className="mt-1" />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Serial No.</InputLabel>
                                            <TextInput
                                                placeholder="Serial No."
                                                className="w-full"
                                                value={data.serial_number || ''}
                                                onChange={(e) => setData('serial_number', e.target.value)}
                                                />
                                            <InputError message={errors.serial_number} className="mt-1" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Brand</InputLabel>
                                            <TextInput
                                                placeholder="Brand"
                                                className="w-full"
                                                value={data.brand || ''}
                                                onChange={(e) => setData('brand', e.target.value)}
                                                />
                                            <InputError message={errors.brand} className="mt-1" />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Description</InputLabel>
                                            <TextInput
                                                placeholder="Description"
                                                className="w-full"
                                                value={data.description || ''}
                                                onChange={(e) => setData('description', e.target.value)}
                                                />
                                            <InputError message={errors.description} className="mt-1" />
                                        </div>
                                    </div>
                                    {(data.category_name ==='CPU' || data.category_name ==='Notebook' || data.category_name ==='Tablet') && (
                                        <div className="">
                                            <div className="grid grid-cols-2 gap-5">
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Processor Type</InputLabel>
                                                    <Select
                                                        name="processor_type"
                                                        options={processorOptions}
                                                        isClearable={true}
                                                        placeholder="Select Processor Type"
                                                        className="mt-1 block"
                                                        value={processorOptions.find((option) => option.value === data.processor_type) || null}
                                                        onChange={selectedOption => setData('processor_type', selectedOption ? selectedOption.value : null)}
                                                        styles={selectStyle}
                                                    />
                                                    <InputError message={errors.processor_type} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Processor Description</InputLabel>
                                                    <TextInput
                                                        placeholder="Processor Description"
                                                        className="w-full"
                                                        value={data.processor_description || ''}
                                                        onChange={(e) => setData('processor_description', e.target.value)}
                                                        />
                                                    <InputError message={errors.processor_description} className="mt-1" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-5">
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Ram Type</InputLabel>
                                                    <Select
                                                        name="ram_type"
                                                        options={ramTypeOptions}
                                                        isClearable={true}
                                                        placeholder="Select RAM Type"
                                                        className="mt-1 block"
                                                        value={ramTypeOptions.find((option) => option.value === data.ram_type) || null}
                                                        onChange={selectedOption => setData('ram_type', selectedOption ? selectedOption.value : null)}
                                                        styles={selectStyle}
                                                    />
                                                    <InputError message={errors.ram_type} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Ram Capacity</InputLabel>
                                                    <Select
                                                        name="ram_capacity"
                                                        options={ramCapacityOptions}
                                                        isClearable={true}
                                                        placeholder="Select RAM Capacity"
                                                        className="mt-1 block"
                                                        value={ramCapacityOptions.find((option) => option.value === data.ram_capacity) || null}
                                                        onChange={selectedOption => setData('ram_capacity', selectedOption ? selectedOption.value : null)}
                                                        styles={selectStyle}
                                                    />
                                                    <InputError message={errors.ram_capacity} className="mt-1" />
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="flex justify-between">
                                                <h1 className="text-gray-800 font-semibold mb-3">Storage :</h1>
                                                    <button type="button" onClick={handleAddStorage} className="inline-flex items-center w-fit h-fit px-2 text-lg py-1 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest focus:ring-offset-2 transition ease-in-out duration-150text-white gap-1 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-600 focus:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                                        <span className="bi-plus"/>
                                                    </button>
                                                </div>
                                                {data.storages.map((storage, index) => {
                                                    return (
                                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-3" key={index}>
                                                        <div className="">
                                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Type {index+1}</InputLabel>
                                                            <Select
                                                                name={`storages[${index}].storage_type`}
                                                                options={storageTypeOptions}
                                                                isClearable={true}
                                                                placeholder="Select Storage Type"
                                                                className="mt-1 block"
                                                                value={storageTypeOptions.find((option) => option.value === storage.storage_type) || null}
                                                                onChange={(selectedOption) => handleStorageChange(index, "storage_type", selectedOption ? selectedOption.value : null)}
                                                                styles={selectStyle}
                                                            />
                                                            
                                                            <InputError message={errors.storages && errors.storages[index]?.storage_type} className="mt-1"/>
                                                        </div>
                                                        <div className="w-full flex items-center gap-3">
                                                            <div className="w-full">
                                                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Capacity {index+1}</InputLabel>
                                                                <Select
                                                                    name={`storages[${index}].storage_capacity`}
                                                                    options={storageCapacityOptions}
                                                                    isClearable={true}
                                                                    placeholder="Select Storage Capacity"
                                                                    className="mt-1 block w-full"
                                                                    value={storageCapacityOptions.find((option) => option.value === storage.storage_capacity) || null}
                                                                    onChange={(selectedOption) => handleStorageChange(index, "storage_capacity", selectedOption ? selectedOption.value : null)}
                                                                    styles={selectStyle}
                                                                />
                                                                <InputError message={errors.storages && errors.storages[index]?.storage_capacity} className="mt-1"/>
                                                            </div>
                                                            {index!=0 && (
                                                                <div onClick={() => handleRemoveStorage (index)} className="mt-6 inline-flex items-center w-fit h-fit px-2 py-2 border border-transparent rounded-md font-semibold text-sm text-white uppercase cursor-pointer tracking-widest focus:ring-offset-2 transition ease-in-out duration-150text-white gap-1 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 bi-trash"></div>
                                                            )}
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
                                                        className="w-full"
                                                        value={data.vga_card || ''}
                                                        onChange={(e) => setData('vga_card', e.target.value)}
                                                        />
                                                    <InputError message={errors.vga_card} className="mt-1" />
                                                </div>

                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">OS Type</InputLabel>
                                                    <Select
                                                        name="os_type"
                                                        options={osTypeOptions}
                                                        isClearable={true}
                                                        placeholder="Select OS Type"
                                                        className="mt-1 block"
                                                        value={osTypeOptions.find((option) => option.value === data.os_type) || null}
                                                        onChange={handleOsTypeChange}
                                                        styles={selectStyle}
                                                    />
                                                    <InputError message={errors.os_type} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">OS Edition</InputLabel>
                                                    <Select
                                                        name="os_edition"
                                                        options={getEditionOptions()}
                                                        isClearable={true}
                                                        placeholder="Select OS Edition"
                                                        className="mt-1 block"
                                                        value={getEditionOptions().find((option) => option.value === data.os_edition) || null}
                                                        onChange={(selectedOption) => setData('os_edition', selectedOption ? selectedOption.value : null)}
                                                        styles={selectStyle}
                                                    />
                                                    <InputError message={errors.os_edition} className="mt-1" />
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-3 gap-5">
                                                
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">OS Architecture</InputLabel>
                                                    <Select
                                                        name="os_architecture"
                                                        options={osArchitectureOptions}
                                                        isClearable={true}
                                                        placeholder="Select OS Architecture"
                                                        className="mt-1 block"
                                                        value={osArchitectureOptions.find((option) => option.value === data.os_architecture) || null}
                                                        onChange={selectedOption => setData('os_architecture', selectedOption ? selectedOption.value : null)}
                                                        styles={selectStyle}
                                                    />
                                                    <InputError message={errors.os_architecture} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1">OS Licence</InputLabel>
                                                    <TextInput
                                                        placeholder="OS Licence"
                                                        className="w-full"
                                                        value={data.os_licence || ''}
                                                        onChange={(e) => setData('os_licence', e.target.value)}
                                                        />
                                                    <InputError message={errors.os_licence} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1">Office Licence</InputLabel>
                                                    <TextInput
                                                        placeholder="Office Licence"
                                                        className="w-full"
                                                        value={data.office_licence || ''}
                                                        onChange={(e) => setData('office_licence', e.target.value)}
                                                        />
                                                    <InputError message={errors.office_licence} className="mt-1" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-4 gap-5">
                                        
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Purchase Date</InputLabel>
                                            <TextInput
                                                type="date"
                                                placeholder="Purchase Date"
                                                className="w-full"
                                                value={data.purchase_date || ''}
                                                onChange={(e) => setData('purchase_date', e.target.value)}
                                                />
                                            <InputError message={errors.purchase_date} className="mt-1" />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel className="mb-1">Waranty Expired Date</InputLabel>
                                            <TextInput
                                                type="date"
                                                placeholder="Waranty Expired Date"
                                                className="w-full"
                                                value={data.warranty_expiry_date || ''}
                                                onChange={(e) => setData('warranty_expiry_date', e.target.value)}
                                                />
                                            <InputError message={errors.warranty_expiry_date} className="mt-1" />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Price</InputLabel>
                                            <TextInput
                                                type="number"
                                                placeholder="Price"
                                                className="w-full"
                                                value={data.price || ''}
                                                onChange={(e) => setData('price', e.target.value)}
                                                />
                                            <InputError message={errors.price} className="mt-1" />
                                        </div>
                                        <div className="mb-5">
                                            <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Supplier</InputLabel>
                                            <Select
                                                name="supplier_id"
                                                options={supplierOptions}
                                                isClearable={true}
                                                placeholder="Select Supplier"
                                                className="mt-1 block"
                                                value={supplierOptions.find(option => option.value === data.supplier_id)}
                                                onChange={(selectedOption) => setData('supplier_id', selectedOption ? selectedOption.value : null)}
                                                styles={selectStyle}
                                            />
                                            <InputError message={errors.supplier_id} className="mt-1" />
                                        </div>       
                                    </div>

                                    <div className="grid grid-cols-3 gap-5">
                                        
                                                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="w-full text-center bg-rose-200 py-3 text-red-600">Select a category first</div>
                    )}
                    
                </div>

                <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                    <Link href={route('admin.device.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        <span className="bi-x-lg"/>
                        <span>Cancel</span>
                    </Link>
                    <PrimaryButton className="gap-1" disabled={processing || !data.category_id || !data.company}>
                        <span className="bi-floppy"/>
                        <span>Save</span>
                    </PrimaryButton>
                </div>
            </form>
            
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
            <div className="flex justify-center w-full">
                <div className="bg-white w-full md:w-full shadow-md rounded-md flex-col">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Edit : {device.code}</div>
                    <div className="w-full divide px-5 space-x-8 border-b">
                        {tabs.map((tab,index) => (
                            <button key={index}
                            className={`py-2 text-gray-500 font-light text-sm uppercase ${index === activeTab && 'font-semibold text-rose-600 border-b-2 border-b-rose-600'}`}
                            onClick={() => handleTabClick(index)}>{tab.title}</button>
                        ))}
                    </div>
                    <div className="p-5">
                        {tabs[activeTab].content}        
                    </div>
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
                                value={data.category_name || ''}
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
                    <div className="flex w-full gap-5 justify-end px-5 py-3 bg-gray-100 rounded-b-lg">
                        <PrimaryButton>Save</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </Authenticated>
    )
}