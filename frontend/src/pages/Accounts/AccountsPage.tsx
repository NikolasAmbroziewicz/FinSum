import { useEffect } from 'react'

import { AppDispatch } from 'src/store/main';
import { useDispatch } from 'react-redux';

import { getAccounts } from 'src/store/Accounts/AccountsSlice';

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';
import PageHeader from 'src/shared/components/PageHeader/PageHeader';

import AccountsForm from 'src/features/Accounts/components/AccountsForm';
import AccountsList from 'src/features/Accounts/components/AccountsList';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

const AccountsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { handleOpenModal, isOpen } = useModal();
  
  useEffect(() => {
    const loadAccounts = async () => {
      await dispatch(getAccounts())
    }

    loadAccounts()
  })

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title='Accounts'
      >
        <BaseButton handler={handleOpenModal}>Add Accounts</BaseButton>
      </PageHeader>
      <AccountsList />
      <BaseModal
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Account"
        content={<AccountsForm onClose={handleOpenModal} />}
      />
    </div>
  );
};

export default AccountsPage;
