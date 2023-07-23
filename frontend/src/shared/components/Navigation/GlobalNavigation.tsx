import { useScreen } from 'src/shared/hooks/useScreen';

import DesktopNavigation from 'src/shared/components/Navigation/DesktopNavigation';
import MobileNaviagtion from 'src/shared/components/Navigation/MobileNavigation';

import { AiOutlineStock, AiOutlineHome } from 'react-icons/ai';
import { BiBitcoin, BiMoney, BiWalletAlt } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';

export type NavData = {
  icon: JSX.Element;
  label: string;
  path: string;
};

const navData: NavData[] = [
  {
    icon: <AiOutlineHome className="text-white text-2xl" />,
    label: 'Home',
    path: '/dashboard'
  },
  {
    icon: <BiWalletAlt className="text-white text-2xl" />,
    label: 'accounts',
    path: '/accounts'
  },
  {
    icon: <BiMoney className="text-white text-2xl" />,
    label: 'Income',
    path: '/income'
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
    icon: <GiTwoCoins className="text-white text-2xl" />,
    label: 'Metal',
    path: '/metals'
  }
];

const GlobalNavigation = () => {
  const { isMobileScreen } = useScreen();
  return (
    <>
      {isMobileScreen() ? (
        <MobileNaviagtion navData={navData} />
      ) : (
        <DesktopNavigation navData={navData} />
      )}
    </>
  );
};

export default GlobalNavigation;
