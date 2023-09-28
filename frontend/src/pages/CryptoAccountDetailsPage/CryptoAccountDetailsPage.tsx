import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'src/store/main';

import H2 from 'src/shared/components/Headers/H2';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';

import CryptoCurrencyForm from 'src/features/CryptoAccountDetails/components/CryptoCurrencyForm';
import CryptoCurrencySummaryList from 'src/features/CryptoAccountDetails/components/summary/CryptoCurrencySummaryList';
import CryptoCurrencyList from 'src/features/CryptoAccountDetails/components/details/CryptoCurrencyList'

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { fetchAllCryptoCurrency } from 'src/store/CryptoAccountDetails/CryptoAccountDetailsSlice'
import { getCryptoCurrencySummary } from 'src/store/CryptoAccountDetails/summary/CryptoAccountDetailsSummarySlice'

const CryptoAccountDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [startDate, setStartDate] = useState(new Date());
  const params = useParams();
  const { handleOpenModal, isOpen } = useModal();

  useEffect(() => {
    dispatch(fetchAllCryptoCurrency(Number(params['accountId'])))
    dispatch(getCryptoCurrencySummary(Number(params['accountId'])))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Crypto</H2>
        <BaseButton handler={handleOpenModal}>Add Crypto Currency</BaseButton>
      </div>
      <CryptoCurrencySummaryList />
      <CryptoCurrencyList 
        accountId={Number(params['accountId'])}
      />
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