import { useNavigate } from 'react-router-dom'

import H3 from 'src/shared/components/Headers/H3';
import ListElementAction from 'src/shared/components/List/ListElementAction';
import { Position } from 'src/shared/components/Headers/Header.types';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';
import { useCryptoAccounts } from 'src/features/CryptoAccounts/hooks/useCryptoAccounts'

import CryptoAccountsForm from 'src/features/CryptoAccounts/components/CryptoAccountsForm';
import { CryptoAccountSchemaType } from 'src/features/CryptoAccounts/validators'

interface ICryptoAccountListElement {
  account: CryptoAccountSchemaType
}

const CryptoAccountListElement: React.FC<ICryptoAccountListElement> = ({ account }) => {
  const navigate = useNavigate()
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } =
    useModal();
  
  const { handleDeleteCryptoAccount } = useCryptoAccounts({
    onClose: handleDeleteOpen
  })

  const handleAccountClick = (id: number | undefined) =>  {
    navigate(`${id}`)
  }

  return (
    <div
      className="flex flex-col justify-between w-[200px] h-[200px] border-slate-300 border-[1px] p-4 rounded-md bg-gray-100"
      onClick={() => handleAccountClick(account.id)}
    >
      <div className="flex justify-between items-center">
        <H3 position={Position.left}>{account.title}</H3>
        <ListElementAction<CryptoAccountSchemaType> 
          element={account}
          isDeleteModalOpen={isDeleteOpen}
          handleDeleteModal={handleDeleteOpen}
          isEditModalOpen={isEditOpen}
          handleEditModal={handleEditOpen}
          handleDeleteElement={handleDeleteCryptoAccount}
          titleDeleteModal="Delete Account"
          titleEditModal="Edit Account"
          contentDeleteModal='Do you want to Delete this Account?'
          contentEditModal={
            <CryptoAccountsForm 
              onClose={handleEditOpen}
              editForm={true}
              account={account}
            />
          }
        />
      </div>
    </div>
  )
}

export default CryptoAccountListElement