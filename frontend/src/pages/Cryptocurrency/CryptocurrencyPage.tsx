import { useEffect } from 'react';

import { AppDispatch } from 'src/store/main';
import { useDispatch } from 'react-redux';

import { getCryptoAccounts } from 'src/store/CryptoAccount/CryptoAccountSlice'

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';
import PageHeader from 'src/shared/components/PageHeader/PageHeader';

import CryptoAccountForm from 'src/features/CryptoAccounts/components/CryptoAccountsForm'

import { useModal } from 'src/shared/components/Modals/hooks/useModal';
import CryptoAccountsList from 'src/features/CryptoAccounts/components/CryptoAccountsList';

const CryptocurrencyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleOpenModal, isOpen } = useModal();

  useEffect(() => {
    const loadAccounts = async () => {
      await dispatch(getCryptoAccounts())
    }

    loadAccounts()
  }, [])

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Crypto Page"
      >
        <BaseButton handler={handleOpenModal}>Add Crypto</BaseButton>
      </PageHeader>
      <CryptoAccountsList />
      <BaseModal 
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Create Wallet"
        content={<CryptoAccountForm onClose={handleOpenModal}/>}
      />
    </div>
  );
};

export default CryptocurrencyPage;
