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

interface IUseAccountExpense {
  onClose?: () => void;
}

export const useAccountExpense = ({
  onClose = undefined
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

  const handleAddExpense = (
    value: AccountDetailsExpenseSchemaType,
    account_id: number
  ) => {
    dispatch(addAccountExpense({ data: value, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  const handleEditExpense = (value: AccountDetailsExpenseSchemaType) => {
    dispatch(editAccountExpense(value));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  const handleDeleteExpense = (value: number) => {
    dispatch(deleteAccountExpense(value));
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
