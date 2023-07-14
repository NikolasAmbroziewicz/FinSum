import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';
import { AccountDetailsIncomeSchemaType, accountDetailsIncomeSchema } from '../validators/AccountDetailsIncomes'

import { useNotificationContext } from 'src/context/NotificationContext';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

import {
  addAccountIncome,
  deleteAccountIncome,
  editAccountIncome
} from 'src/store/AccountsDetails/incomes/AccountDetailsIncomes'

interface IUseAccountIncome {
  onClose?: () => void,
  account_id: string
}
export const useAccountIncome = ({ onClose = undefined, account_id }: IUseAccountIncome) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleNotification } = useNotificationContext()

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

  const handleAddIncome = (value: AccountDetailsIncomeSchemaType, account_id: number) => {
    dispatch(addAccountIncome({data: value, account_id: account_id}));

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success)
    }
  }

  const handleEditIncome = (value: AccountDetailsIncomeSchemaType, income_id: number) => {
    dispatch(editAccountIncome({data: value, income_id: income_id}))

    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success)
    }
  }

  const handleDeleteIncome = (value: number) => {
    dispatch(deleteAccountIncome(value))
    if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success)
    }
  }

  return {
    handleAddIncome,
    handleDeleteIncome,
    handleEditIncome,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  }
}