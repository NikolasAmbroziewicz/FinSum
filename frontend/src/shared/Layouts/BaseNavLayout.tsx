import GlobalNavigation from '../components/naviagation/GlobalNavigation';
import { useScreen } from 'src/shared/hooks/useScreen';

interface IBaseNavLayout {
  children: JSX.Element;
}

const BaseNavLayout: React.FC<IBaseNavLayout> = ({ children }) => {
  const { isMobileScreen } = useScreen();

  return (
    <div
      className={`flex ${
        isMobileScreen() ? 'flex-col' : 'flex-row'
      }  w-screen h-screen`}
    >
      <GlobalNavigation />
      <div className="overflow-scroll m-6 w-full">{children}</div>
    </div>
  );
};

export default BaseNavLayout;
