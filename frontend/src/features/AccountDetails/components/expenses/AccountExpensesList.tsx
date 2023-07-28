import { useSelector } from 'react-redux';

import {
  getAllExpenses,
  getLoadingStatus
} from 'src/store/AccountsDetails/expenses/AccountDetailsExpensesSlice';

import AccountExpenseForm from './AccountExpenseForm';

import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';
import BaseTable from 'src/shared/components/Table/BaseTable';

import ListElement from 'src/shared/components/List/ListElement';
import ListElementMobile from 'src/shared/components/List/ListElementMobile';
import ListElementAction from 'src/shared/components/List/ListElementAction';

import { useAccountExpense } from 'src/features/AccountDetails/hooks/useAccountExpense';

import { useScreen } from 'src/shared/hooks/useScreen';
import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { LoadingPosition } from 'src/shared/components/Loading/types';
import { AccountDetailsExpenseSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsExpenses';

interface IAccountExpensesList {
  account_id: number;
  date: Date
}

const AccountExpensesList: React.FC<IAccountExpensesList> = ({
  account_id,
  date
}) => {
  const expenses = useSelector(getAllExpenses);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen();
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } =
    useModal();

  const { handleDeleteExpense } = useAccountExpense({
    onClose: handleDeleteOpen,
    account_id: account_id,
    date: date
  });

  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        {loading ? (
          <Loading position={LoadingPosition.start} />
        ) : expenses.length !== 0 ? (
          isMobileScreen() ? (
            <div className="flex gap-2 flex-col">
              {expenses.map((element) => (
                <ListElementMobile
                  key={element.id}
                  title={element.title}
                  amount={element.amount}
                  date={element.date}
                >
                  <ListElementAction<AccountDetailsExpenseSchemaType>
                    element={element}
                    isDeleteModalOpen={isDeleteOpen}
                    handleDeleteModal={handleDeleteOpen}
                    isEditModalOpen={isEditOpen}
                    handleEditModal={handleEditOpen}
                    handleDeleteElement={handleDeleteExpense}
                    titleDeleteModal="Delete Income"
                    titleEditModal="EditModal"
                    contentEditModal={
                      <AccountExpenseForm
                        onClose={handleEditOpen}
                        editForm={true}
                        income={element}
                        account_id={account_id}
                        date={date}
                      />
                    }
                  />
                </ListElementMobile>
              ))}
            </div>
          ) : (
            <BaseTable
              headers={['Title', 'Amount', 'Date', '']}
              headerWidth={['1/2', '100px', '130px', '60px']}
            >
              {expenses.map((element) => (
                <ListElement
                  key={element.id}
                  title={element.title}
                  amount={element.amount}
                  date={element.date}
                >
                  <ListElementAction<AccountDetailsExpenseSchemaType>
                    element={element}
                    isDeleteModalOpen={isDeleteOpen}
                    handleDeleteModal={handleDeleteOpen}
                    isEditModalOpen={isEditOpen}
                    handleEditModal={handleEditOpen}
                    handleDeleteElement={handleDeleteExpense}
                    titleDeleteModal="Delete Income"
                    titleEditModal="EditModal"
                    contentEditModal={
                      <AccountExpenseForm
                        onClose={handleEditOpen}
                        editForm={true}
                        income={element}
                        account_id={account_id}
                        date={date}
                      />
                    }
                  />
                </ListElement>
              ))}
            </BaseTable>
          )
        ) : (
          <NotFound text={'No Income Found'} />
        )}
      </div>
    </div>
  );
};

export default AccountExpensesList;
