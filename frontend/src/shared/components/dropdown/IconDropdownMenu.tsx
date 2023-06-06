import { useState, forwardRef, useImperativeHandle } from 'react';

import { BiDotsVerticalRounded } from 'react-icons/bi';

import { DropdownContent } from './types';

export interface IIconDropdownMenuRef {
  handleMenuOpen: () => void;
}

interface IIconDropdownMenu {
  dropdownContent: DropdownContent[];
}

const IconDropdownMenu = forwardRef<IIconDropdownMenuRef, IIconDropdownMenu>(
  ({ dropdownContent }, ref) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      handleMenuOpen() {
        setMenuOpen(!menuOpen);
      }
    }));

    const handleMenuOpen = () => {
      setMenuOpen(!menuOpen);
    };

    return (
      <>
        <button className="flex justify-end" onClick={handleMenuOpen}>
          <BiDotsVerticalRounded className="text-xl cursor-pointer"  />
        </button>
        {menuOpen && (
          <ul className="absolute right-0 mt-2 rounded-md bg-white border-slate-300 border-[1px] z-[1]">
            {dropdownContent.map((element) => (
              <li
                key={element.id}
                className="flex items-center text-gray-700 px-4 py-2 text-base cursor-pointer hover:bg-slate-100"
                onClick={element.handler}
              >
                {element.icon}
                <span className="ml-2">{element.content}</span>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
);

export default IconDropdownMenu;
