import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'src/store/main';
import { getAccountExpenses } from 'src/store/AccountsDetails/expenses/AccountDetailsExpensesSlice';

import H2 from 'src/shared/components/Headers/H2';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';

import AccountExpenseForm from './AccountExpenseForm';
import AccountExpensesList from './AccountExpensesList';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

interface IAccountExpense {
  startDate: Date
}

const AccountExpense: React.FC<IAccountExpense> = ({ startDate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleOpenModal, isOpen } = useModal();
  const params = useParams();

  useEffect(() => {
    dispatch(getAccountExpenses({
      account_id: Number(params['accountId']),
      date: startDate
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Expenses</H2>
        <BaseButton handler={handleOpenModal}>Add Expense</BaseButton>
      </div>
      <AccountExpensesList account_id={Number(params['accountId'])} />
      <BaseModal
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Expense"
        content={
          <AccountExpenseForm
            onClose={handleOpenModal}
            editForm={false}
            account_id={Number(params['accountId'])}
          />
        }
      />
    </div>
  );
};

export default AccountExpense;
