import { Link } from "@inertiajs/react";

export default function MenuDropdownContent({link,text,openSidebar,icon}) {
    return (
        <Link href={link} className={`text-gray-400 inline-flex space-x-3 py-2 px-4 items-center w-full hover:text-white active:text-white hover:bg-slate-800 pl-12 ${openSidebar & 'pl-12'}`}>
            <div className='bi-circle'></div>
            <div className={`${openSidebar && 'hidden'}`}>Kategori</div>
        </Link>
    )
}