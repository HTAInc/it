import { createContext, useContext, useEffect, useState } from "react";

const DropDownContext = createContext();
const MenuDropdown = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(localStorage.getItem('openDropdown') === 'true');
  
  const toggleOpen = () => {
    setOpenDropdown((previousState) => !previousState);
  };

  useEffect(() => {
    localStorage.setItem('openDropdown', openDropdown.toString());
  }, [openDropdown]);

  return (
    <DropDownContext.Provider value={{ openDropdown, toggleOpen }}>
      <div className="relative">
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({children,openSidebar  }) => {
    const { toggleOpen, openDropdown } = useContext(DropDownContext);
    return (
      <button
        className={`text-gray-400 inline-flex w-full py-2 px-5 items-center overflow-hidden hover:text-white active:text-white hover:bg-slate-800 ${openSidebar ? ' justify-center rounded' : 'justify-between'}`}
        onClick={toggleOpen}
      >
        <div className="inline-flex items-center space-x-3">
          <div className={`text-xl bi-folder`}></div>
          {children}
        </div>
        <div className={`text-xl transition-all ease-in-out duration-300 bi-chevron-down ${openDropdown && '-rotate-180'} ${openSidebar ? 'hidden':'block'}`}></div>
      </button>
    );
  };

  const Content = ({ children,openSidebar }) => {
    const { openDropdown } = useContext(DropDownContext);
    return (
      <div className={`w-full transition-all ease-in-out mt-3 space-y-3 duration-300 overflow-hidden ${openDropdown ? 'flex-inline' : 'hidden'} ${openSidebar ? 'px-2':'px-0'}`}>
        {children}
      </div>
    );
  };

MenuDropdown.Trigger = Trigger;
MenuDropdown.Content = Content;

export default MenuDropdown;
