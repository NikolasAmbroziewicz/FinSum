import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';
import { incomeSchema, IncomeSchemaType } from 'src/features/Income/validators';

import { useNotificationContext } from 'src/context/NotificationContext';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

import {
  addIncome,
  deleteIncome,
  editIncome
} from 'src/store/Incomes/IncomesSlice';

interface IUseIncome {
  onClose?: () => void;
}

export const useIncome = ({ onClose = undefined }: IUseIncome) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleNotification } = useNotificationContext()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<IncomeSchemaType>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      date: new Date()
    }
  });

  const handleAddIncome = (value: IncomeSchemaType) => {
    dispatch(addIncome(value));

  if (onClose) {
      onClose();
      handleNotification('Income has been Added.', SnackbarType.success)
    }
  };

  const handleEditIncome = (value: IncomeSchemaType) => {
    dispatch(editIncome(value));

    if (onClose) {
      onClose();
      handleNotification('Income has been Edited.', SnackbarType.neutral)
    }
  };

  const handleDeleteIncome = (value: number) => {
    dispatch(deleteIncome(value));

    if (onClose) {
      onClose();
      handleNotification('Income has been Removed.', SnackbarType.danger)
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
