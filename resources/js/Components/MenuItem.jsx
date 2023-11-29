import { Link } from "@inertiajs/react";
import { useContext } from "react";

export default function MenuItem({openSidebar,link,text,icon,className,active}) {
    return (
        <Link href={link} className={`text-gray-400 inline-flex space-x-3 py-2 px-4 items-center  active:text-white ${openSidebar && 'rounded'}  ${className} ${route().current(active) ? 'bg-rose-500 text-white' : 'hover:text-white hover:bg-slate-800'}`}>
            <div className={`text-xl ${icon}`}></div>
            <div className={`${openSidebar && 'hidden'}`}>{text}</div>
        </Link>
    )
}