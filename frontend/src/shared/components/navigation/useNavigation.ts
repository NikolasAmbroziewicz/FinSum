import { useState } from 'react'
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleNavOpen = () => {
    setIsOpen(!isOpen);
  };

  const activeRoute = (path: string): string => {
    return location.pathname.includes(path) ? 'bg-sky-700' : 'bg-inherit';
  };
 
  return {
    activeRoute,
    handleNavOpen,
    isOpen
  }
}