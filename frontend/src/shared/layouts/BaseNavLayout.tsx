import GlobalNavigation from '../components/Navigation/GlobalNavigation';
import BaseSnackbar from '../components/Snackbar/BaseSnackbar';

import { useScreen } from 'src/shared/hooks/useScreen';
import { useNotificationContext } from 'src/context/NotificationContext';

interface IBaseNavLayout {
  children: JSX.Element;
}

const BaseNavLayout: React.FC<IBaseNavLayout> = ({ children }) => {
  const { isMobileScreen } = useScreen();

  const {
    showNotification,
    notificationType,
    notificationValue,
    handleShowNotification
  } = useNotificationContext();

  return (
    <div
      className={`flex ${
        isMobileScreen() ? 'flex-col' : 'flex-row'
      }  w-screen h-screen`}
    >
      <GlobalNavigation />
      <div className="overflow-scroll  p-2 smplus:p-6 smplus:w-full grow">
        {children}
      </div>
      {showNotification && (
        <BaseSnackbar
          message={notificationValue}
          type={notificationType}
          onClick={handleShowNotification}
        />
      )}
    </div>
  );
};

export default BaseNavLayout;
