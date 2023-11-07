import { Link } from "@inertiajs/react";
import { useContext } from "react";

export default function MenuItem({openSidebar,link,text,icon,className}) {
    return (
        <Link href={link} className={`text-gray-400 inline-flex space-x-3 py-2 px-4 items-center hover:text-white active:text-white hover:bg-slate-800 ${className}`}>
            <div className={`text-xl ${icon}`}></div>
            <div className={`${openSidebar && 'hidden'}`}>{text}</div>
        </Link>
    )
}