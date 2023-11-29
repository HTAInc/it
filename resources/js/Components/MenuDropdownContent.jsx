import { Link } from "@inertiajs/react";
import { Children } from "react";

export default function MenuDropdownContent({link,text,openSidebar,active}) {
    return (
        <Link href={link} className={`text-gray-400 inline-flex space-x-3 py-2 overflow-hidden items-center w-full ${openSidebar ? 'pl-0 justify-center rounded' : 'pl-12'} ${route().current(active) ? 'bg-rose-500 text-white' : 'hover:text-white hover:bg-slate-800'}`}>
            <div className='bi-circle'></div>
        <div className={`${openSidebar && 'hidden'}`}>{text}</div>
        </Link>
    )
}