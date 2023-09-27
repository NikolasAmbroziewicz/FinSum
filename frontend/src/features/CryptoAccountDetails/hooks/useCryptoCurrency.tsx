import { useDispatch } from 'react-redux'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';

import {
  cryptoCurrencyDetailsSchema,
  CryptoCurrencyDetailsSchemaType
} from '../validators'

import { useNotificationContext } from 'src/context/NotificationContext';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

import {
  addCryptoCurrency,
  editCryptoCurrency,
  deleteCryptoCurrency
} from 'src/store/CryptoAccountDetails/CryptoAccountDetailsSlice'

import {
  getCryptoCurrencySummary
} from 'src/store/CryptoAccountDetails/summary/CryptoAccountDetailsSummarySlice'

interface IUseCryptoCurrency {
  onClose?: () => void,
  accountId: number
}

export const useCryptoCurrency = ({
  onClose = undefined,
  accountId,
}: IUseCryptoCurrency) => {
  const dispatch = useDispatch<AppDispatch>()
  const { handleNotification } = useNotificationContext()

  const  {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<CryptoCurrencyDetailsSchemaType>({
    resolver: zodResolver(cryptoCurrencyDetailsSchema),
    defaultValues: {
      date_bought: new Date(),
      date_sold: null,
    }
  })

  const handleAddCryptoCurrency = async (value: CryptoCurrencyDetailsSchemaType) => {
    await dispatch(addCryptoCurrency({ data: value, account_id: accountId}))
    await dispatch(getCryptoCurrencySummary(accountId))

    if(onClose) {
      onClose()
      handleNotification('Crypto Currency has been added', SnackbarType.success)
    }
  }

  const handleEditCryptoCurrency = async (value: CryptoCurrencyDetailsSchemaType) => {
    await dispatch(editCryptoCurrency(value))
    await dispatch(getCryptoCurrencySummary(accountId))

    if(onClose) {
      onClose()
      handleNotification('Crypto Currency has been edited', SnackbarType.neutral)
    }
  }

  const handleDeleteCryptoCurrency = async (value: number) => {
    await dispatch(deleteCryptoCurrency(value))
    await dispatch(getCryptoCurrencySummary(accountId))

    if(onClose) {
      onClose()
      handleNotification('Crypto Currency has been Removed', SnackbarType.danger)
    }
  }

  return {
    handleAddCryptoCurrency,
    handleEditCryptoCurrency,
    handleDeleteCryptoCurrency,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  }
}