import MenuDropdown from "@/Components/MenuDropdown";
import MenuDropdownContent from "@/Components/MenuDropdownContent";
import MenuLabel from "@/Components/MenuLabel";
import ApplicationLogo from "../Components/ApplicationLogo";
import MenuItem from "../Components/MenuItem";

export default function Sidebar({openSidebar}) {
    return (
        <div className={`bg-slate-900 border-r border-gray-200 transition-all ease-in-out duration-300 space-y-3 flex flex-col ${openSidebar ? 'w-[70px] items-center' : 'w-0 md:md:w-[300px]'}`}>
            <div className="w-full bg-rose-500 py-3 px-4 inline-flex items-center space-x-3 text-white">
                <ApplicationLogo className="text-white"/>
                <div className={`font-semibold text-xl ${openSidebar && 'hidden'}`}>IT Dept.</div>
            </div>
            <MenuItem link={route('admin.dashboard')} active='admin.dashboard' openSidebar={openSidebar} text="Dashboard" icon="bi-house"/>
            <MenuLabel openSidebar={openSidebar} text="Work Orders"/>
            <MenuItem link={route('admin.work-order.index')} active='admin.work-order.*' openSidebar={openSidebar} text="Work Order" icon="bi-receipt"/>
            <MenuLabel openSidebar={openSidebar} text="Downtime"/>
            <MenuItem link={route('admin.downtime.index')} active='admin.downtime.*' openSidebar={openSidebar} text="Downtime" icon="bi-bar-chart-line"/>
            <MenuLabel openSidebar={openSidebar} text="Devices"/>
            <MenuItem openSidebar={openSidebar} link={route('admin.device.index')} active='admin.device.*' text="Asset" icon="bi-upc-scan"/>
            <MenuItem openSidebar={openSidebar} link="" active='register' text="Support" icon="bi-mouse2"/>
            <MenuLabel openSidebar={openSidebar} text="Data Master"/>
            <MenuDropdown>
                <MenuDropdown.Trigger openSidebar={openSidebar}>
                    <div className={`${openSidebar ? 'hidden':'block'}`}>Data Master</div>
                </MenuDropdown.Trigger>
                <MenuDropdown.Content openSidebar={openSidebar}>
                    <MenuDropdownContent openSidebar={openSidebar} link={route('admin.user.index')} text="User" active="admin.user.*"/>
                    <MenuDropdownContent openSidebar={openSidebar} link={route('admin.category.index')} text="Category" active="admin.category.*"/>
                    <MenuDropdownContent openSidebar={openSidebar} link={route('admin.supplier.index')} text="Supplier" active="admin.supplier.*"/>
                    <MenuDropdownContent openSidebar={openSidebar} link={route('admin.department.index')} text="Department" active="admin.department.*"/>
                    <MenuDropdownContent openSidebar={openSidebar} link={route('admin.section.index')} text="Section" active="admin.section.*"/>
                </MenuDropdown.Content>
            </MenuDropdown>
        </div>
    )
}