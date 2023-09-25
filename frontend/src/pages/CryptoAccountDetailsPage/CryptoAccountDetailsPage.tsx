import { useState } from 'react';
import { useParams } from 'react-router-dom'

import H2 from 'src/shared/components/Headers/H2';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';

import CryptoCurrencyForm from 'src/features/CryptoAccountDetails/components/CryptoCurrencyForm';
import CryptoCurrencySummaryList from 'src/features/CryptoAccountDetails/components/CryptoCurrencySummaryList';
import CryptoCurrencyList from 'src/features/CryptoAccountDetails/components/CryptoCurrencyList'

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

const CryptoAccountDetailsPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const params = useParams();
  const { handleOpenModal, isOpen } = useModal();

  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Crypto</H2>
        <BaseButton handler={handleOpenModal}>Add Crypto Currency</BaseButton>
      </div>
      <CryptoCurrencySummaryList />
      <CryptoCurrencyList />
      <BaseModal 
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Crypto Currency"
        content={
          <CryptoCurrencyForm
            onClose={handleOpenModal}
            accountId={Number(params['accountId'])}
          />
        }
      />
    </div>
  )
}

export default CryptoAccountDetailsPage