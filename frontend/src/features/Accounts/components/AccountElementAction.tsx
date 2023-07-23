import React, { useRef } from 'react'

import BaseModal from 'src/shared/components/Modals/BaseModal'
import BaseButton from 'src/shared/components/Button/base/BaseButton'
import IconDropdownMenu, { IIconDropdownMenuRef } from 'src/shared/components/Dropdown/IconDropdownMenu'

import AccountsForm from 'src/features/Accounts/components/AccountsForm'

import { useModal } from 'src/shared/components/Modals/hooks/useModal';
import { useAccount } from 'src/features/Accounts/hooks/useAccounts';

import { ButtonTheme } from 'src/shared/components/Button/base/types';
import { DropdownContent } from 'src/shared/components/Dropdown/types';
import { AccountSchemaType } from 'src/features/Accounts/validators'

import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';

interface IAccountElementAction {
  account: AccountSchemaType
}

const AccountElementAction: React.FC<IAccountElementAction> = ({ account }) => {
  const incomeMenuRef = useRef<IIconDropdownMenuRef>(null);

  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } = useModal();

  const { handleDeleteAccounts } = useAccount({
    onClose: handleDeleteOpen
  })

  const handleEditAction = () => {
    //Open Modal
    handleEditOpen();
    // Close Action Menu
    incomeMenuRef.current?.handleMenuOpen();
  };

  const handleDeleteAction = () => {
    // Open Modal
    handleDeleteOpen();
    // Close Action Menu
    incomeMenuRef.current?.handleMenuOpen();
  };

  const dropdownContent: DropdownContent[] = [
    {
      id: 1,
      content: 'Edit',
      icon: <AiFillEdit />,
      handler: handleEditAction
    },
    {
      id: 2,
      content: 'Delete',
      icon: <AiOutlineClose />,
      handler: handleDeleteAction
    }
  ];

  return (
    <div className='relative'>
      <IconDropdownMenu ref={incomeMenuRef} dropdownContent={dropdownContent} />
      {
        isDeleteOpen && (
          <BaseModal
          isOpen={isDeleteOpen}
          onClose={handleDeleteOpen}
          title="Delete Income"
          content={
            <span className="text-gray-600 mx-4">
              Do you want do delete this Account?
            </span>
          }
          action={
            <>
              <BaseButton
                color={ButtonTheme.base}
                styles="w-[45%]"
                handler={() => handleDeleteAccounts(account.id as number)}
              >
                Yes
              </BaseButton>
              <BaseButton
                color={ButtonTheme.error}
                styles="w-[45%]"
                handler={() => handleDeleteOpen()}
              >
                No
              </BaseButton>
            </>
          }
        />
      )}
      {isEditOpen && (
        <BaseModal
          isOpen={isEditOpen}
          onClose={handleEditOpen}
          title="Edit Account"
          content={
            <AccountsForm
              onClose={handleEditOpen}
              editForm={true}
              income={account}
            />
          }
        />
      )}
    </div>
  )
}

export default AccountElementAction