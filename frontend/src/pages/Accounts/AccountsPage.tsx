import { useEffect } from 'react'

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';
import PageHeader from 'src/shared/components/PageHeader/PageHeader';

import AccountsForm from 'src/features/Accounts/components/AccountsForm';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

const AccountsPage = () => {
  const { handleOpenModal, isOpen } = useModal();
  
  return (
    <div className="flex flex-col">
      <PageHeader 
        title='Accounts'
      >
        <BaseButton handler={handleOpenModal}>Add Accounts</BaseButton>
      </PageHeader>
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
