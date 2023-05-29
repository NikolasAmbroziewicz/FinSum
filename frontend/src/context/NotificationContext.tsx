import { createContext, useContext, useState } from 'react'

interface INotificationContext {
  showNotification: boolean,
  handleShowNotification: () => void,
  notificationValue: string,
  handleNotificationValue: (val: string) => void,
}

const defaultValue: INotificationContext = {
  showNotification: false,
  handleShowNotification: () => {},
  notificationValue: '',
  handleNotificationValue: () => {}
}

const NotificationContext = createContext<INotificationContext>(defaultValue)

export const NotificationProvider: React.FC<{ children: JSX.Element}> = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationValue, setNotificationValue] = useState('')

  const handleShowNotification = () => {
    setShowNotification(!showNotification)
  }

  const handleNotificationValue = (value: string) => {
    setNotificationValue(value)
  }

  return (
    <NotificationContext.Provider value={{ showNotification, notificationValue, handleNotificationValue, handleShowNotification}} >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = useContext(NotificationContext)