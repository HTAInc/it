import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { useEffect,useState } from 'react';

export default function Navbar({onOpenSidebarChange ,name}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(
        localStorage.getItem('sidebarCollapsed') === 'true'
    );

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', openSidebar);
        onOpenSidebarChange(openSidebar);
    }, [openSidebar,onOpenSidebarChange]);


    const toggleSidebar = () => {
        setOpenSidebar((prevCollapsed) => !prevCollapsed);
    };

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="px-4 py-2">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <div className="hidden space-x-3 sm:flex">
                            <div className="px-2 py-1 bg-gray-100 hover:bg-gray-100 rounded-full cursor-pointer group transition ease-in-out hover:rotate-180" onClick={toggleSidebar}>
                                <div className={`${openSidebar ? 'bi-x-lg' : 'bi-list'} text-gray-800 text-xl group-hover:text-rose-600`}></div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center space-x-6">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="relative py-2">
                                        <div className="bi-bell text-gray-500 px-1 cursor-pointer hover:text-gray-800 active:text-gray-800"></div>
                                        <span className="absolute flex h-2 w-2 top-1 right-0">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex space-x-2 items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <span>{name}</span>

                                            <img src="https://picsum.photos/200" className='w-9 h-9 bg-gray-300 rounded-full overflow-hidden' alt="" />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">{name}</div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}