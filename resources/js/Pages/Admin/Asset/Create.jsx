import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link from "@/Components/Link";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import getSelectStyle from "@/Utility/getSelectStyle";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import Select from 'react-select';
import Swal from "sweetalert2";
import { format, subYears } from 'date-fns';

export default function create({auth, categories,suppliers,users,departments}) {
    const currentYear = new Date().getFullYear();
    const { data, setData, post, processing, errors } = useForm({
        company: '',
        category_id: '',
        budget: '',
        category_name: '',
        code: '',
        serial_number: '',
        brand: '',
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
        os_licence: '',
        office_licence: '',
        purchase_date: '',
        warranty_expiry_date: '',
        price: '',
        status: 'Available',
        ip: '',
        note: '',
        supplier_id: '',
        user_id: '',
        department_id: '',
        name:'',
        transaction_date: '',
    });

    const selectStyle = getSelectStyle();

    const companyOptions = [
        {value: 'ARSI', label: 'ARSI'},
        {value: 'HTA', label: 'HTA'},
        {value: 'TTA', label: 'TTA'},
        {value: 'DCM', label: 'DCM'},
        {value: 'RMU', label: 'RMU'},
        {value: 'GBI', label: 'GBI'},
    ];

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


    const processorOptions = [
        {value: 'Intel Celeron', label: 'Intel Celeron'},
        {value: 'Intel Pentium', label: 'Intel Pentium'},
        {value: 'Intel Core Duo', label: 'Intel Core Duo'},
        {value: 'Intel Core i3', label: 'Intel Core i3'},
        {value: 'Intel Core i5', label: 'Intel Core i5'},
        {value: 'Intel Core i7', label: 'Intel Core i7'},
        {value: 'Intel Core i9', label: 'Intel Core i9'},
        {value: 'MD Athlon', label: 'MD Athlon'},
        {value: 'AMD Ryzen 3', label: 'AMD Ryzen 3'},
        {value: 'AMD Ryzen 5', label: 'AMD Ryzen 5'},
        {value: 'AMD Ryzen 7', label: 'AMD Ryzen 7'},
        {value: 'AMD Ryzen 9', label: 'AMD Ryzen 9'},
    ];

    const ramTypeOptions = [
        {value: 'DDR', label: 'DDR'},
        {value: 'DDR2', label: 'DDR2'},
        {value: 'DDR3', label: 'DDR3'},
        {value: 'DDR4', label: 'DDR4'},
        {value: 'DDR5', label: 'DDR5'},
    ];
    
    const ramCapacityOptions = [
        {value: '2GB', label: '2GB'},
        {value: '4GB', label: '4GB'},
        {value: '8GB', label: '8GB'},
        {value: '16GB', label: '16GB'},
        {value: '32GB', label: '32GB'},
        {value: '64GB', label: '64GB'},
        {value: '128GB', label: '128GB'},
        {value: '256GB', label: '256GB'},
    ];
    
    const storageTypeOptions = [
        {value: 'HDD', label: 'HDD'},
        {value: 'SSD', label: 'SSD'},
        {value: 'SSHD', label: 'SSHD'},
        {value: 'NVMe SSD', label: 'NVMe SSD'},
        {value: 'eMMC', label: 'eMMC'},
        {value: 'RAID', label: 'RAID'},
        {value: 'Tape Drive', label: 'Tape Drive'},
        {value: 'Optical Drive', label: 'Optical Drive'},
        {value: 'SD Card', label: 'SD Card'},
        {value: 'USB Flash Drive', label: 'USB Flash Drive'},
    ];

    const storageCapacityOptions = [
        {value: '128GB', label: '128GB'},
        {value: '256GB', label: '256GB'},
        {value: '500GB', label: '500GB'},
        {value: '1TB', label: '1TB'},
        {value: '2TB', label: '2TB'},
        {value: '4TB', label: '4TB'},
        {value: '8TB', label: '8TB'},
        {value: '16TB', label: '16TB'},
        {value: '32TB', label: '32TB'},
        {value: '64TB', label: '64TB'},
    ];

    const osTypeOptions = [
        {value: 'Windows XP', label: 'Windows XP'},
        {value: 'Windows 7', label: 'Windows 7'},
        {value: 'Windows 8', label: 'Windows 8'},
        {value: 'Windows 10', label: 'Windows 10'},
        {value: 'Windows 11', label: 'Windows 11'},
        {value: 'Windows Server', label: 'Windows Server'},
        {value: 'macOS Big Sur', label: 'macOS Big Sur'},
        {value: 'macOS Catalina', label: 'macOS Catalina'},
        {value: 'macOS Mojave', label: 'macOS Mojave'},
        {value: 'Linux Ubuntu', label: 'Linux Ubuntu'},
        {value: 'Linux Fedora', label: 'Linux Fedora'},
        {value: 'Linux Debian', label: 'Linux Debian'},
        {value: 'Linux CentOS', label: 'Linux CentOS'},
        {value: 'Unix', label: 'Unix'},
        {value: 'Android', label: 'Android'},
        {value: 'iOS', label: 'iOS'},
        {value: 'Chrome OS', label: 'Chrome OS'},
        {value: 'FreeBSD', label: 'FreeBSD'},
        {value: 'Solaris', label: 'Solaris'},
    ];

    const osEditionsOptions = {
        'Windows XP': ['Home', 'Professional'],
        'Windows 7': ['Home Basic', 'Home Premium', 'Professional', 'Ultimate'],
        'Windows 8': ['Standard', 'Pro', 'Enterprise'],
        'Windows 10': ['Home', 'Pro', 'Enterprise'],
        'Windows 11': ['Home', 'Pro', 'Enterprise'],
        'Windows Server': ['2008', '2012', '2016', '2019'],
        'macOS Big Sur': ['Standard Edition'],
        'macOS Catalina': ['Standard Edition'],
        'macOS Mojave': ['Standard Edition'],
        'Linux Ubuntu': ['Desktop', 'Server'],
        'Linux Fedora': ['Workstation', 'Server'],
        'Linux Debian': ['Desktop', 'Server'],
        'Linux CentOS': ['Desktop', 'Server'],
        'Unix': ['Standard Edition'],
        'Android': ['Standard Edition'],
        'iOS': ['Standard Edition'],
        'Chrome OS': ['Standard Edition'],
        'FreeBSD': ['Standard Edition'],
        'Solaris': ['Standard Edition'],
    };

    const getEditionOptions = () => {
        return data.os_type && osEditionsOptions[data.os_type]?.map((edition) => ({ value: edition, label: edition })) || [];
    };

    const osArchitectureOptions = [
        {value: '32-bit', label: '32-bit'},
        {value: '64-bit', label: '64-bit'},
        {value: 'Multi-bit', label: 'Multi-bit'},
    ];

    const supplierOptions = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
    }));

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
        if (selectedCompany && selectedCategory && selectedBudget) {
            try {
                const response = await axios.get(`/admin/asset/lastcode/${selectedCompany}/${selectedCategory}/${selectedBudget}`);
                const newCode = response.data;
                setData((prevData) => ({
                    ...prevData,
                    code: newCode.lastCode,
                }));
            } catch (error) {
                console.error('Error fetching last code:', error);
            }
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
        if (!data.company || !data.category_id) {
            setData((prevData) => ({
                ...prevData,
                code: '',
            }));
        } else {
            fetchLastCode(data.company, data.category_id);
        }
    }, [data.company, data.category_id]);
    
    useEffect(() => {
        if(data.category_name != 'CPU' || data.category_name != 'Notebook' || data.category_name != 'Tablet'){
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
        
    },[data.category_name]);

    useEffect(() => {
        if(data.status != 'Installed'){
            setData((prevData) => ({
                ...prevData,
                user_id:'',
                department_id:'',
                name:'',
                transaction_date:''
            }))
        };
    },[data.status])

    useEffect(() => {
        if (data.status ==='Installed' && data.company && data.category_id && data.department_id) {
            axios.get(`/admin/asset/lastname/${data.company}/${data.category_id}/${data.department_id}`)
            .then(response => {
                const newName = response.data;
                setData((prevData) => ({
                    ...prevData,
                    name: newName.lastName,
                }));
            })
            .catch(error => {
                console.error('Error fetching last name:', error);
            });
        }
    }, [data.company, data.category_id, data.department_id]);

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Simpan?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('admin.asset.store'));
            }
        }); 
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Asset" />
            <div className="flex justify-center mb-10">
                <form onSubmit={submit} className="bg-white w-full md:w-3/4 shadow-md rounded-md flex flex-col">
                    <div className="w-full px-5 py-2 font-semibold text-rose-600 border-b">Create New Assets</div>
                    <div className="p-5">
                        <div className="mb-5 border-b pb-5 w-full grid grid-cols-3 gap-5">
                            <div className="">
                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Company</InputLabel>
                                <Select
                                    name="company"
                                    options={companyOptions}
                                    isClearable={true}
                                    placeholder="Select Company"
                                    className="mt-1 block"
                                    value={companyOptions.find(option => option.value === data.company)||null}
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
                                    placeholder="Select Budget"
                                    className="mt-1 block"
                                    value={budgetOptions.find(option => option.value === data.budget)}
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
                                                    value={data.serial_number}
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
                                                    value={data.brand}
                                                    onChange={(e) => setData('brand', e.target.value)}
                                                    />
                                                <InputError message={errors.brand} className="mt-1" />
                                            </div>
                                            <div className="mb-5">
                                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Description</InputLabel>
                                                <TextInput
                                                    placeholder="Description"
                                                    className="w-full"
                                                    value={data.description}
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
                                                            value={data.processor_description}
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
                                                <div className="grid grid-cols-2 gap-5">
                                                    <div className="mb-5">
                                                        <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Storage Type</InputLabel>
                                                        <Select
                                                            name="storage_type"
                                                            options={storageTypeOptions}
                                                            isClearable={true}
                                                            placeholder="Select Storage Type"
                                                            className="mt-1 block"
                                                            value={storageTypeOptions.find((option) => option.value === data.storage_type) || null}
                                                            onChange={selectedOption => setData('storage_type', selectedOption ? selectedOption.value : null)}
                                                            styles={selectStyle}
                                                        />
                                                        <InputError message={errors.storage_type} className="mt-1" />
                                                    </div>
                                                    <div className="mb-5">
                                                        <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Storage Capacity</InputLabel>
                                                        <Select
                                                            name="storage_capacity"
                                                            options={storageCapacityOptions}
                                                            isClearable={true}
                                                            placeholder="Select Storage Capacity"
                                                            className="mt-1 block"
                                                            value={storageCapacityOptions.find((option) => option.value === data.storage_capacity) || null}
                                                            onChange={selectedOption => setData('storage_capacity', selectedOption ? selectedOption.value : null)}
                                                            styles={selectStyle}
                                                        />
                                                        <InputError message={errors.storage_capacity} className="mt-1" />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-5">
                                                    <div className="mb-5">
                                                        <InputLabel className="mb-1">VGA Card</InputLabel>
                                                        <TextInput
                                                            placeholder="VGA Card"
                                                            className="w-full"
                                                            value={data.vga_card}
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
                                                            value={data.os_licence}
                                                            onChange={(e) => setData('os_licence', e.target.value)}
                                                            />
                                                        <InputError message={errors.os_licence} className="mt-1" />
                                                    </div>
                                                    <div className="mb-5">
                                                        <InputLabel className="mb-1">Office Licence</InputLabel>
                                                        <TextInput
                                                            placeholder="Office Licence"
                                                            className="w-full"
                                                            value={data.office_licence}
                                                            onChange={(e) => setData('office_licence', e.target.value)}
                                                            />
                                                        <InputError message={errors.office_licence} className="mt-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-3 gap-5">
                                            <div className="mb-5">
                                                <InputLabel className="mb-1">IP Address</InputLabel>
                                                <TextInput
                                                    placeholder="IP Address"
                                                    className="w-full"
                                                    value={data.ip}
                                                    onChange={(e) => setData('ip', e.target.value)}
                                                    />
                                                <InputError message={errors.ip} className="mt-1" />
                                            </div>
                                            <div className="mb-5">
                                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Purchase Date</InputLabel>
                                                <TextInput
                                                    type="date"
                                                    placeholder="Purchase Date"
                                                    className="w-full"
                                                    value={data.purchase_date}
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
                                                    value={data.warranty_expiry_date}
                                                    onChange={(e) => setData('warranty_expiry_date', e.target.value)}
                                                    />
                                                <InputError message={errors.warranty_expiry_date} className="mt-1" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-5">
                                            <div className="mb-5">
                                                <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Price</InputLabel>
                                                <TextInput
                                                    type="number"
                                                    placeholder="Price"
                                                    className="w-full"
                                                    value={data.price}
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
                                            <div className="mb-5">
                                                <InputLabel className="mb-1">Note</InputLabel>
                                                <TextInput
                                                    placeholder="Note"
                                                    className="w-full"
                                                    value={data.note}
                                                    onChange={(e) => setData('note', e.target.value)}
                                                    />
                                                <InputError message={errors.note} className="mt-1" />
                                            </div>
                                            <div className="mb-5">
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
                                            
                                        </div>
                                        
                                        {data.status === 'Installed' && (
                                            <div className="grid grid-cols-4 gap-5">
                                                <div className="mb-5">
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
                                                    />
                                                    <InputError message={errors.user_id} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
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
                                                    />
                                                    <InputError message={errors.department_id} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Transaction Date</InputLabel>
                                                    <TextInput
                                                        type="date"
                                                        placeholder="Transaction Date"
                                                        className="w-full"
                                                        value={data.transaction_date}
                                                        onChange={(e) => setData('transaction_date', e.target.value)}
                                                        />
                                                    <InputError message={errors.transaction_date} className="mt-1" />
                                                </div>
                                                <div className="mb-5">
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
                                        )}
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="w-full text-center bg-rose-200 py-3 text-red-600">Select a category first</div>
                        )}
                        
                    </div>

                    <div className="w-full bg-gray-100 px-5 py-2 flex items-center space-x-3 justify-end">
                        <Link href={route('admin.asset.index')} className="gap-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <span className="bi-x-lg"/>
                            <span>Cancel</span>
                        </Link>
                        <PrimaryButton className="gap-1" disabled={processing || !data.category_id || !data.company}>
                            <span className="bi-floppy"/>
                            <span>Save</span>
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    )
}