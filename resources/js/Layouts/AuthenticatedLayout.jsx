import Navbar from '@/Parts/Navbar';
import Sidebar from '@/Parts/Sidebar';
import { useEffect, useState } from 'react';

export default function Authenticated({ user, children }) {
    const [openSidebar, setOpensidebar] = useState(localStorage.getItem('openSidebar') === 'true');
    const handleDataFromNavbar = (data) => {
        setOpensidebar(data);
        localStorage.setItem('openSidebar', data);
    };
    useEffect(() => {
        const storedValue = localStorage.getItem('openSidebar');
        if (storedValue) {
            setOpensidebar(storedValue);
        }
    }, []);
    return (
        <div className="h-screen bg-slate-100 flex">
            <Sidebar openSidebar={openSidebar}
                active={route().current('dashboard')}
            />
            
            <div className="w-full overflow-y-auto transition ease-in-out duration-700">
                <Navbar open={open} name={user.name} onOpenSidebarChange={handleDataFromNavbar}/>
                <main className='p-4 '>{children}</main>
            </div>
        </div>
    );
}
