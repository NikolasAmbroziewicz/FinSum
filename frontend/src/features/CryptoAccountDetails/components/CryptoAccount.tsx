import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'src/store/main';

import CryptoCurrencyForm from './CryptoCurrencyForm';

import H2 from 'src/shared/components/Headers/H2';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

const CryptoAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleOpenModal, isOpen } = useModal();
  const params = useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Crypto</H2>
        <BaseButton handler={handleOpenModal}>Add Crypto Currency</BaseButton>
      </div>
      <BaseModal 
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Crypto Currency Wallet"
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

export default CryptoAccount