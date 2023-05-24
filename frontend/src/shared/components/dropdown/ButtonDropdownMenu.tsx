import { useState } from "react"

import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import { DropdownContent } from "./types"

interface IBaseDropdownMenu {
  dropdownContent: DropdownContent[],
  error: boolean,
  handleValue: (value: string) => void,
  value: string,
}

const BaseDropdownMenu: React.FC<IBaseDropdownMenu> = ({ dropdownContent, error, handleValue, value,}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const handleMenuOpen = () => {
    setMenuOpen(true)
  }
  
  const handleClick = (val: string) => {
    setMenuOpen(false)
    handleValue(val)
  }

  const borderColor = () => {
    return error ? 'border-rose-400' : 'border-slate-300';
  }

  return (
    <div className="relative">
      <button
        className={`flex justify-between items-center w-full shadow border ${borderColor()} rounded py-2 px-3  leading-tight 
        focus:outline-none focus:shadow-outline focus:borderfocus:border-sky-600`}
        type="button"
        onClick={handleMenuOpen}
      >
        <span className={`${value === undefined ? 'text-slate-300' : 'text-slate-600'}`}>{value === undefined ? 'Select' : value}</span>
        {
          menuOpen ? (
            <BiChevronUp className="text-slate-600 text-2xl" />
          ): (
            <BiChevronDown className="text-slate-600 text-2xl" />
          )
        }
      </button>

      {
        menuOpen && (
          <ul className="absolute w-full right-0 z-2 mt-2 rounded-md bg-white border-slate-300 border-[1px]">
          {
            dropdownContent.map((element) => (
              <li 
                key={element.id} 
                className="text-gray-700 block px-4 py-2 text-base cursor-pointer hover:bg-slate-100"
                onClick={() => handleClick(element.content)}
              >
                {element.content}
              </li>
            ))
          }
        </ul>
        )
      }
    </div>
  )
}

export default BaseDropdownMenu