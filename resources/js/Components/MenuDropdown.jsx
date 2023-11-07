import { createContext, useContext, useState } from "react";

const DropDownContext = createContext();
const MenuDropdown = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleOpen = () => {
    setOpenDropdown((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ openDropdown, toggleOpen }}>
      <div className="relative">
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({children }) => {
    const { toggleOpen, openDropdown } = useContext(DropDownContext);
    return (
      <button
        className="text-gray-400 inline-flex justify-between w-full space-x-3 py-2 px-4 items-center hover:text-white active:text-white"
        onClick={toggleOpen}
      >
        <div className="inline-flex items-center space-x-3">
          <div className={`text-xl bi-folder`}></div>
          {children}
        </div>
        <div className={`text-xl transition-all ease-in-out duration-300 bi-chevron-down ${openDropdown && '-rotate-180'}`}></div>
      </button>
    );
  };

  const Content = ({ children }) => {
    const { openDropdown } = useContext(DropDownContext);
    return (
      <div className={`w-full transition-all ease-in-out dura ${openDropdown ? 'flex-inline' : 'hidden'}`}>
        {children}
      </div>
    );
  };

MenuDropdown.Trigger = Trigger;
MenuDropdown.Content = Content;

export default MenuDropdown;
