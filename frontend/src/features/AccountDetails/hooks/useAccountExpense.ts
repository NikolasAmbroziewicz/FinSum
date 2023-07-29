import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';
import {
  accountDetailsExpenseSchema,
  AccountDetailsExpenseSchemaType
} from '../validators/AccountDetailsExpenses';

import { useNotificationContext } from 'src/context/NotificationContext';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

import {
  addAccountExpense,
  deleteAccountExpense,
  editAccountExpense
} from 'src/store/AccountsDetails/expenses/AccountDetailsExpensesSlice';

import { getAccountSummary } from 'src/store/AccountsDetails/summary/AccountDetailsSummarySlice';

interface IUseAccountExpense {
  onClose?: () => void;
  date: Date;
  account_id: number;
}

export const useAccountExpense = ({
  onClose = undefined,
  date,
  account_id
}: IUseAccountExpense) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleNotification } = useNotificationContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<AccountDetailsExpenseSchemaType>({
    resolver: zodResolver(accountDetailsExpenseSchema),
    defaultValues: {
      date: new Date()
    }
  });

  const handleAddExpense = async (value: AccountDetailsExpenseSchemaType) => {
    await dispatch(addAccountExpense({ data: value, account_id: account_id }));
    await dispatch(getAccountSummary({ date: date, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  const handleEditExpense = async (value: AccountDetailsExpenseSchemaType) => {
    await dispatch(editAccountExpense(value));
    await dispatch(getAccountSummary({ date: date, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  const handleDeleteExpense = async (value: number) => {
    await dispatch(deleteAccountExpense(value));
    await dispatch(getAccountSummary({ date: date, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  return {
    handleAddExpense,
    handleDeleteExpense,
    handleEditExpense,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  };
};
