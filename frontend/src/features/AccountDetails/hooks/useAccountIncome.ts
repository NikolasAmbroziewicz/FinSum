import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';
import {
  AccountDetailsIncomeSchemaType,
  accountDetailsIncomeSchema
} from '../validators/AccountDetailsIncomes';

import { useNotificationContext } from 'src/context/NotificationContext';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

import {
  addAccountIncome,
  deleteAccountIncome,
  editAccountIncome
} from 'src/store/AccountsDetails/incomes/AccountDetailsIncomesSlice';

import { getAccountSummary } from 'src/store/AccountsDetails/summary/AccountDetailsSummarySlice';

interface IUseAccountIncome {
  onClose?: () => void;
  account_id: number;
  date: Date;
}
export const useAccountIncome = ({
  onClose = undefined,
  account_id,
  date
}: IUseAccountIncome) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleNotification } = useNotificationContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<AccountDetailsIncomeSchemaType>({
    resolver: zodResolver(accountDetailsIncomeSchema),
    defaultValues: {
      date: new Date()
    }
  });

  const handleAddIncome = async (value: AccountDetailsIncomeSchemaType) => {
    await dispatch(addAccountIncome({ data: value, account_id: account_id }));
    await dispatch(getAccountSummary({ date: date, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  const handleEditIncome = async (value: AccountDetailsIncomeSchemaType) => {
    await dispatch(editAccountIncome(value));
    await dispatch(getAccountSummary({ date: date, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  const handleDeleteIncome = async (value: number) => {
    await dispatch(deleteAccountIncome(value));
    await dispatch(getAccountSummary({ date: date, account_id: account_id }));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success);
    }
  };

  return {
    handleAddIncome,
    handleDeleteIncome,
    handleEditIncome,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  };
};
