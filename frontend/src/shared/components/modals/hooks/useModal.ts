import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    handleOpenModal,
    isOpen
  };
};
