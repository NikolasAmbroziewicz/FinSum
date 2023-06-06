import { Link } from 'react-router-dom';

import { NavData } from 'src/shared/components/navigation/GlobalNavigation';
import {useNavigation} from './useNavigation'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import MainLogo from 'src/shared/images/MainLogo.svg';

interface IDesktopNavigation {
  navData: NavData[];
}

const DesktopNavigation: React.FC<IDesktopNavigation> = ({
  navData
}) => {
  const { isOpen, handleNavOpen, activeRoute } = useNavigation()

  const navStyle = () => {
    return isOpen ? '200' : '60';
  };
  return (
    <nav
      className={`relative flex flex-col w-[${navStyle()}px] bg-sky-600 p-2`}
      data-test="desktopNavigation"
    >
      <button
        onClick={handleNavOpen}
        className="absolute right-[-10px] top-[40px] border-2 rounded-full border-white bg-white cursor-pointer"
        data-test="toggleButton"
      >
        {isOpen ? (
          <AiOutlineArrowLeft data-test="closedIcon" className="text-base" />
        ) : (
          <AiOutlineArrowRight data-test="openIcon" className="text-base" />
        )}
      </button>
      <div className="flex justify-center h-[75px]">
        {isOpen ? (
          <img src={MainLogo} className="p-2 w-[150px]" alt="Main Logo" />
        ) : null}
      </div>
      <ul>
        {navData.map((data) => (
          <Link
            to={data.path}
            className={`flex p-2 cursor-pointer hover:bg-sky-700 rounded-[4px] ${activeRoute(
              data.path
            )}`}
            key={data.label}
          >
            {data.icon}
            {isOpen && <span className="text-white pl-2">{data.label}</span>}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
