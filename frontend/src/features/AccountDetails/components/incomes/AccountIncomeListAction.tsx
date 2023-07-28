import ListElementAction from 'src/shared/components/List/ListElementAction';

import AccountIncomeForm from './AccountIncomeForm';

import { useAccountIncome } from 'src/features/AccountDetails/hooks/useAccountIncome';
import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { AccountDetailsIncomeSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsIncomes';

interface IAccountIncomeListAction {
  account_id: number,
  date: Date,
  income: AccountDetailsIncomeSchemaType
}

const AccountIncomeListAction: React.FC<IAccountIncomeListAction> = ({ account_id, date, income}) => {
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } =useModal();

  const { handleDeleteIncome } = useAccountIncome({
    onClose: handleDeleteOpen,
    account_id: account_id,
    date: date
  });

  return (
    <ListElementAction<AccountDetailsIncomeSchemaType>
      element={income}
      isDeleteModalOpen={isDeleteOpen}
      handleDeleteModal={handleDeleteOpen}
      isEditModalOpen={isEditOpen}
      handleEditModal={handleEditOpen}
      handleDeleteElement={handleDeleteIncome}
      titleDeleteModal="Delete Income"
      titleEditModal="EditModal"
      contentEditModal={
        <AccountIncomeForm
          onClose={handleEditOpen}
          editForm={true}
          income={income}
          account_id={account_id}
          startDate={date}
        />
      }
    />
  )
}

export default AccountIncomeListAction