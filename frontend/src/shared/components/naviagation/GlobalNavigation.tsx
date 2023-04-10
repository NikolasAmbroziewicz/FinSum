import { useState } from 'react'

import { Link, useLocation } from 'react-router-dom';

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStock, AiFillHome } from 'react-icons/ai'
import { BiBitcoin, BiMoney } from 'react-icons/bi'
import { GiMetalBar } from 'react-icons/gi'
import MainLogo from 'src/images/MainLogo.svg';

const navData = [
  {
    icon: <AiFillHome className="text-white text-2xl" />,
    label: 'Home',
    path: '/dashboard'
  },
  {
    icon: <BiMoney className="text-white text-2xl" />,
    label: 'Month Cash',
    path: '/month-finance'
  },
  {
    icon: <BiBitcoin className="text-white text-2xl" />,
    label: 'Cryptocurrency',
    path: '/cryptocurrency'
  },
  {
    icon: <AiOutlineStock className="text-white text-2xl" />,
    label: 'Stock',
    path: '/stock'
  },
  {
    icon: <GiMetalBar className="text-white text-2xl" />,
    label: 'Metal',
    path: '/metals'
  }
]

const GlobalNavigation = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleNavOpen = () => {
    setIsOpen(!isOpen)
  }

  const navStyle = () => {
    return isOpen ? '200' : '50'
  }

  const activeRoute = (path: string) => {
    return location.pathname === path ? 'bg-sky-700' : 'bg-inherit'
  }

  return (
    <nav className={`relative flex flex-col w-[${navStyle()}px] bg-sky-600 p-2`}>
      <div onClick={handleNavOpen} className="absolute right-[-10px] top-[40px] border-2 rounded-full border-white bg-white">
        { isOpen ? <AiOutlineArrowLeft className='text-base' /> : <AiOutlineArrowRight className='text-base' />}
      </div>
      <div className='flex justify-center h-[75px]'>
        { isOpen ? <img src={MainLogo} className="p-2 w-[150px]" alt="Main Logo"/> : null}
      </div>
      <ul>
        {
          navData.map((data) => (
            <Link
                to={data.path}
                className={`flex p-2 cursor-pointer hover:bg-sky-700 rounded-[4px] ${activeRoute(data.path)}`}
                key={data.label}
              >
              {data.icon}
              {
                isOpen && <span className='text-white pl-2'>{data.label}</span>
              }
              
            </Link>
          ))
        }
      </ul>
    </nav>
  ) 
}

export default GlobalNavigation