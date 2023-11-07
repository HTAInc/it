import MenuLabel from "@/Components/MenuLabel";
import ApplicationLogo from "../Components/ApplicationLogo";
import MenuItem from "../Components/MenuItem";
import { Link } from "@inertiajs/react";
import MenuDropdown from "@/Components/MenuDropdown";
import MenuDropdownContent from "@/Components/MenuDropdownContent";
import { useEffect, useState } from "react";

export default function Sidebar({openSidebar}) {
    return (
        <div className={`bg-slate-900 border-r border-gray-200 transition-all ease-in-out duration-300 space-y-3 flex flex-col ${openSidebar ? 'w-16 items-center' : 'w-0 md:md:w-[300px]'}`}>
            <div className="w-full bg-rose-500 py-3 px-4 inline-flex items-center space-x-3 text-white">
                <ApplicationLogo className="text-white"/>
                <div className={`font-semibold text-xl ${openSidebar && 'hidden'}`}>IT Dept.</div>
            </div>
            <MenuItem link="" openSidebar={openSidebar} text="Dashboard" icon="bi-house"/>
            <MenuLabel openSidebar={openSidebar} text="Assets"/>
            <MenuItem openSidebar={openSidebar} link="" text="Assets" icon="bi-upc-scan"/>
            <MenuItem openSidebar={openSidebar} link="" text="Accessories" icon="bi-mouse2"/>
            <MenuDropdown>
                <MenuDropdown.Trigger>
                    <div className={`${openSidebar ? 'hidden':'block'}`}>Data Master</div>
                </MenuDropdown.Trigger>
                <MenuDropdown.Content>
                    <MenuDropdownContent openSidebar={openSidebar}>Kategori</MenuDropdownContent>
                    <MenuDropdownContent openSidebar={openSidebar}>Kategori</MenuDropdownContent>
                </MenuDropdown.Content>
            </MenuDropdown>
            <MenuItem link="" openSidebar={openSidebar} text="Master" icon="bi-folder"/>
        </div>
    )
}