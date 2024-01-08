import Filter from "@/Components/Filter";
import FlashMessage from "@/Components/FlashMessage";
import IconButton from "@/Components/IconButton";
import Link from "@/Components/Link";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getFormatDate } from "@/Utility/getFormatDate";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index({auth,workOrders, flashMessage}) {
    const { get,delete: destroy,put } = useForm();
    const [filterText, setFilterText] = useState('');
    
    const handleFilter = e => {
        const value = e.target.value || '';
        setFilterText(value);
    };
    const handleClear = () => {
        setFilterText('');
    };

    const filteredData = workOrders.filter(item =>
        item.code.toLowerCase().includes(filterText.toLowerCase())
    );

    function handlePick(id) {
        Swal.fire({
            text: 'Take this job?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Take',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`/admin/work-order/take/${id}`)
                    .then((response) => {
                        Swal.fire({
                            text: response.data.meta.message,
                            showConfirmButton: false,
                            icon: 'success',
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        console.log(error.data.meta.message);
                        Swal.fire({
                            text: error.data.meta.message,
                            icon: 'error',
                        });
                    });
            }
        });
    }

    const handleEdit = (id) => {
        get(route('admin.work-order.edit',id));
    }
    const handleShow = (id) => {
        get(route('admin.work-order.show',id));
    }

    function handleDelete(id) {
        Swal.fire({
            text: 'Sure you want to delete?',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton:false,
            denyButtonText: 'Delete',
        }).then((result) => {
            if (result.isDenied) {
                destroy(route('admin.work-order.destroy',id))
            }
        });
    };

    const columns = [
        {
            name:'No',
            width:'4%',
            selector: (_, index) => index + 1,
        },
        {
            name:'Record No.',
            selector:row => row.code,
            sortable: true,
        },
        {
            name:'Request Date',
            selector:row => row.created_at,
            cell:row => (
                <div className="">
                    <div className="">{getFormatDate(row.created_at,'dd-MM-yy | HH:mm')}</div>
                </div>
            ),
            sortable: true,
        },
        {
            name:'Request',
            selector:row => row.request,
            sortable: true,
        },
        {
            name:'Action',
            selector:row => row.action || '-',
            sortable: true,
        },
        {
            name:'User',
            selector:row => row.user?.name,
            cell:row => (
                <div className="">
                    <div className="text-rose-600 font-semibold">{row.user?.name}</div>
                    <div className="">{`${row.user?.department?.name}, ${row.user?.section?.name}`}</div>
                </div>
            ),
            sortable: true,
        },
        {
            name:'Approved',
            selector:row => row.leader?.name,
            cell:row => (
                <div className="">
                    <div className="text-rose-600 font-semibold">{row.leader?.name}</div>
                    <div className="text-xs font-light">{ getFormatDate(row.approved_at,'dd-MM-yy | HH:mm')}</div>
                </div>
            ),
            sortable: true,
        },
        {
            name:'PIC',
            selector:row => row.pic?.name || '-',
            cell:row => (
                <div className="">
                    <div className="text-rose-600 font-semibold">{row.pic?.name || '-'}</div>
                    <div className="text-xs font-light">P : {row.progress_at ? getFormatDate(row.progress_at,'dd-MM-yy | HH:mm'):'-'}</div>
                    <div className="text-xs font-light">D : {row.done_at ? getFormatDate(row.done_at,'dd-MM-yy | HH:mm'):'-'}</div>
                </div>
            ),
            sortable: true,
        },
        {
            name:'Status',
            selector:row => row.status,
            cell: row => (
                <div className={`text-white px-3 py-1 text-xs rounded ${row.status ==='CREATED' ? 'bg-gray-500' : row.status === 'APPROVED' ? 'bg-rose-500' : row.status === 'PROGRESS' ? 'bg-yellow-500' : 'bg-emerald-500'}`}>{row.status}</div>
            ),
            sortable: true,
        },
        {
            name:'Action',
            cell: row => (
                (
                    <div className="flex items-center gap-3">
                        {row.status === 'APPROVED' && (
                            <IconButton onClick={()=> handlePick(row.id)} className="bi-hand-index bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 focus:bg-yellow-600 focus:ring-yellow-600"/>
                        )}
                        {(row.status === 'PROGRESS' && row.pic.id === auth.user.id) && (
                            <IconButton onClick={()=> handleEdit(row.id)} className="bi-check-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-600 focus:bg-emerald-600 focus:ring-emerald-600"/>
                        )}
                        <IconButton onClick={()=> handleShow(row.id)} className="bi-eye bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600 focus:ring-sky-600"/>
                        <IconButton onClick={()=> handleDelete(row.id)} className="bi-trash bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600 focus:ring-gray-600"/>
                    </div>
                )
            )
        }
    ]
    return (
        <Authenticated user={auth.user}>
            <Head title="work-order" />
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} type={flashMessage.type}/>
            )}
            <div className="w-full">
                <div className="flex justify-between mb-3">
                    <Link href={route('admin.work-order.create')} className="bg-rose-500 hover:bg-rose-600 focus:bg-rose-600 active:bg-rose-600 focus:ring-rose-500">
                        <span className="bi-plus-lg"/>Add
                    </Link>
                    <Filter filterText={filterText} onFilter={handleFilter} onClear={handleClear}/>
                </div>
                <div className="bg-white p-3">
                    <DataTable
                        title="Work Order"
                        data={filteredData}
                        columns={columns}
                        pagination
                    />
                </div>
            </div>
        </Authenticated>
    )
}