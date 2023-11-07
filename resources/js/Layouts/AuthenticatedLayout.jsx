import Navbar from '@/Parts/Navbar';
import Sidebar from '@/Parts/Sidebar';
import { useState } from 'react';

export default function Authenticated({ user, children }) {
    const [openSidebar, setOpensidebar] = useState();
    const handleDataFromNavbar  = (data) => {
        setOpensidebar(data);
      };
    return (
        <div className="min-h-screen bg-slate-100 flex">
            <Sidebar openSidebar={openSidebar}
                active={route().current('dashboard')}
            />
            
            <div className="w-full transition ease-in-out duration-700">
                <Navbar open={open} name={user.name} onOpenSidebarChange={handleDataFromNavbar} />
                <main>{children}</main>
            </div>
        </div>
    );
}
