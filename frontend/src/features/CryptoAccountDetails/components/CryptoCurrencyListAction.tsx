import ListElementAction from 'src/shared/components/List/ListElementAction';

import CryptoCurrencyForm from './CryptoCurrencyForm';

import { useCryptoCurrency } from 'src/features/CryptoAccountDetails/hooks/useCryptoCurrency';
import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { CryptoCurrencyDetailsSchemaType } from 'src/features/CryptoAccountDetails/validators'

interface ICryptoCurrencyListAction {
  accountId: number,
  cryptoCurrency: CryptoCurrencyDetailsSchemaType
}

const CryptoCurrencyListAction: React.FC<ICryptoCurrencyListAction> = ({
  accountId,
  cryptoCurrency
}) => {
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } = useModal();

  const { handleDeleteCryptoCurrency } = useCryptoCurrency({
    onClose: handleDeleteOpen,
    accountId: accountId,
  })

  return (
    <ListElementAction<CryptoCurrencyDetailsSchemaType>
      element={cryptoCurrency}
      isDeleteModalOpen={isDeleteOpen}
      handleDeleteModal={handleDeleteOpen}
      isEditModalOpen={isEditOpen}
      handleEditModal={handleEditOpen}
      handleDeleteElement={handleDeleteCryptoCurrency}
      titleDeleteModal="Delete Income"
      titleEditModal="Edit Income"
      contentDeleteModal='Do you want Delete this Income?'
      contentEditModal={
        <CryptoCurrencyForm
          onClose={handleEditOpen}
          editForm={true}
          cryptoCurrency={cryptoCurrency}
          accountId={accountId}
        />
      }
    />
  )
}

export default CryptoCurrencyListAction