import { createContext, useContext, useState } from 'react';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

interface INotificationContext {
  handleNotification: (value: string, notificationType: SnackbarType) => void;
  handleShowNotification: () => void;
  notificationValue: string;
  showNotification: boolean;
  notificationType: SnackbarType;
}

const defaultValue: INotificationContext = {
  handleNotification: () => {},
  handleShowNotification: () => {},
  notificationValue: '',
  showNotification: false,
  notificationType: SnackbarType.neutral
};

const NotificationContext = createContext<INotificationContext>(defaultValue);

export const NotificationProvider: React.FC<{ children: JSX.Element }> = ({
  children
}) => {
  const [notificationType, setNotificationType] = useState(
    SnackbarType.neutral
  );
  const [showNotification, setShowNotification] = useState(false);
  const [notificationValue, setNotificationValue] = useState('');

  const handleNotification = (
    value: string,
    notificationType: SnackbarType
  ) => {
    setShowNotification(!showNotification);
    setNotificationValue(value);
    setNotificationType(notificationType);
  };

  const handleShowNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        notificationValue,
        handleNotification,
        handleShowNotification,
        notificationType
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
