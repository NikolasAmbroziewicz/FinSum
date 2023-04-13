import { Link } from 'react-router-dom';

import { NavData } from './GlobalNavigation';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import MainLogo from 'src/images/MainLogo.svg';

interface IDesktopNavigation {
  activeRoute: (path: string) => string;
  isOpen: boolean;
  handleNavOpen: () => void;
  navData: NavData[];
}

const MobileNavigation: React.FC<IDesktopNavigation> = ({
  activeRoute,
  isOpen,
  handleNavOpen,
  navData
}) => {
  return (
    <nav>
      <div className="flex justify-center relative m-2">
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2"
          onClick={handleNavOpen}
        >
          <AiOutlineMenu className="text-xl mr-1" />
        </button>
        <img src={MainLogo} alt="Main Logo" className="h-[40px]" />
      </div>
        <div className={`fixed inset-0 ${isOpen ? 'w-screen': 'w-0'} bg-slate-400 bg-opacity-25`}>
          <div className={`flex-col h-screen ${isOpen ? 'w-2/3': 'w-0'} overflow-hidden bg-sky-600 bg-opacity-100  transition-all duration-500`}>
            <button className="flex justify-end m-3">
              <AiOutlineClose
                className="text-white text-xl self-end"
                onClick={handleNavOpen}
              />
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
