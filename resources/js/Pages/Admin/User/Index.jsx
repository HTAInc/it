import Filter from "@/Components/Filter";
import FlashMessage from "@/Components/FlashMessage";
import IconButton from "@/Components/IconButton";
import Link from "@/Components/Link";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index({auth,users,flashMessage}) {
    const { get,delete: destroy } = useForm();
    const [filterText, setFilterText] = useState('');
    
    const handleFilter = e => {
        const value = e.target.value || '';
        setFilterText(value);
    };
    const handleClear = () => {
        setFilterText('');
    };

    const filteredData = users.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleEdit = (id) => {
        get(route('admin.user.edit',id));
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
                destroy(route('admin.user.destroy',id))
            }
        });
    };

    const columns = [
        {
            name:'No',
            selector: (_, index) => index + 1,
        },
        {
            name:'Name',
            selector:row => row.name,
            sortable: true,
        },
        {
            name:'Email',
            selector:row => row.email || '-',
            sortable: true,
        },
        {
            name:'Department',
            selector:row => row.department?.name || '-',
            sortable: true,
        },
        {
            name:'Section',
            selector:row => row.section?.name || '-',
            sortable: true,
        },
        {
            name:'Role',
            selector:row => row.roles[0].name,
            sortable: true,
        },
        {
            name:'Action',
            cell: row => (
                (
                    <div className="flex items-center gap-3">
                        <IconButton onClick={()=> handleEdit(row.id)} className="bi-pencil bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 focus:bg-yellow-600 focus:ring-yellow-600"/>
                        <IconButton onClick={()=> handleDelete(row.id)} className="bi-trash bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:ring-gray-600"/>
                    </div>
                )
            )
        }
    ]
    return (
        <Authenticated user={auth.user}>
            <Head title="user" />
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
            )}
            <div className="w-full">
                <div className="flex justify-between mb-3">
                    <Link href={route('admin.user.create')} className="bg-rose-500 hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-600 focus:ring-rose-500">
                        <span className="bi-plus-lg"/>Add
                    </Link>
                    <Filter filterText={filterText} onFilter={handleFilter} onClear={handleClear}/>
                </div>
                <div className="bg-white p-3">
                    <DataTable
                        title="user"
                        data={filteredData}
                        columns={columns}
                        pagination
                    />
                </div>
            </div>
        </Authenticated>
    )
}