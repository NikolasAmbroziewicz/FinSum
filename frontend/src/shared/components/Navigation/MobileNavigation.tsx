import { Link } from 'react-router-dom';

import { NavData } from './GlobalNavigation';

import { useNavigation } from './useNavigation';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import MainLogo from 'src/shared/images/MainLogo.svg';

interface IDesktopNavigation {
  navData: NavData[];
}

const MobileNavigation: React.FC<IDesktopNavigation> = ({ navData }) => {
  const { isOpen, handleNavOpen, activeRoute } = useNavigation();

  return (
    <nav className="bg-sky-600 z-[10]" data-test="mobileNavigation">
      <div className="flex justify-center relative m-2">
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2"
          onClick={handleNavOpen}
          data-test="iconOpen"
        >
          <AiOutlineMenu className="text-xl mr-1 text-white" />
        </button>
        <img src={MainLogo} alt="Main Logo" className="h-[40px]" />
      </div>
      <div
        className={`fixed inset-0 ${
          isOpen ? 'w-screen' : 'w-0'
        } bg-slate-400 bg-opacity-25`}
        data-test="menuWrapper"
      >
        <div
          className={`flex-col h-screen ${
            isOpen ? 'w-2/3' : 'w-0'
          } overflow-hidden bg-sky-600 bg-opacity-100  transition-all duration-500`}
          data-test="navList"
        >
          <button
            className="flex justify-end m-3"
            onClick={handleNavOpen}
            data-test="iconClose"
          >
            <AiOutlineClose className="text-white text-xl self-end" />
          </button>
          <div>
            {navData.map((data) => (
              <Link
                to={data.path}
                className={`flex m-2 p-2 cursor-pointer hover:bg-sky-700 rounded-[4px] ${activeRoute(
                  data.path
                )}`}
                key={data.label}
              >
                {data.icon}
                <span className="text-white pl-2">{data.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
