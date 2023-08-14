import ListElementAction from 'src/shared/components/List/ListElementAction';

import AccountExpenseForm from './AccountExpenseForm';

import { useAccountExpense } from 'src/features/AccountDetails/hooks/useAccountExpense';
import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { AccountDetailsExpenseSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsExpenses';

interface IAccountExpenseListAction {
  account_id: number;
  date: Date;
  expense: AccountDetailsExpenseSchemaType;
}

const AccountExpenseListAction: React.FC<IAccountExpenseListAction> = ({
  account_id,
  date,
  expense
}) => {
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } =
    useModal();

  const { handleDeleteExpense } = useAccountExpense({
    onClose: handleDeleteOpen,
    account_id: account_id,
    date: date
  });

  return (
    <ListElementAction<AccountDetailsExpenseSchemaType>
      element={expense}
      isDeleteModalOpen={isDeleteOpen}
      handleDeleteModal={handleDeleteOpen}
      isEditModalOpen={isEditOpen}
      handleEditModal={handleEditOpen}
      handleDeleteElement={handleDeleteExpense}
      titleDeleteModal="Delete Expense"
      titleEditModal="Edit Expense"
      contentDeleteModal='Do you want Delete this Expense?'
      contentEditModal={
        <AccountExpenseForm
          onClose={handleEditOpen}
          editForm={true}
          income={expense}
          account_id={account_id}
          date={date}
        />
      }
    />
  );
};

export default AccountExpenseListAction;
