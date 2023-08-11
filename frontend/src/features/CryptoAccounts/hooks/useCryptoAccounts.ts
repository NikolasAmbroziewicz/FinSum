import { useDispatch } from 'react-redux'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppDispatch } from 'src/store/main'

import { 
  cryptoAccountSchema, 
  CryptoAccountSchemaType 
} from 'src/features/CryptoAccounts/validators'

import { useNotificationContext } from 'src/context/NotificationContext';
import { SnackbarType } from 'src/shared/components/Snackbar/type';

import {
  addCryptoAccounts,
  deleteCryptoAccounts,
  editCryptoAccounts
} from 'src/store/CryptoAccount/CryptoAccountSlice'


interface IUseCryptoAccounts {
  onClose?: () => void;
}

export const useCryptoAccounts = ({ onClose }: IUseCryptoAccounts) => {
  const dispatch = useDispatch<AppDispatch>()
  const { handleNotification } = useNotificationContext()
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<CryptoAccountSchemaType>({
    resolver: zodResolver(cryptoAccountSchema)
  })

  const handleAddCrytoAccount = (value: CryptoAccountSchemaType) => {
    dispatch(addCryptoAccounts(value))

    if (onClose) {
      onClose()
      handleNotification('Account has been Added', SnackbarType.success)
    }
  }

  const handleDeleteCryptoAccount = (id: number) => {
    dispatch(deleteCryptoAccounts(id))

    if (onClose) {
      onClose()
      handleNotification('Account has been Removed', SnackbarType.danger)
    }
  }

  const handleEditCryptoAccount = (value: CryptoAccountSchemaType) => {
    dispatch(editCryptoAccounts(value))

    if (onClose) {
      onClose()
      handleNotification('Account has been Edited', SnackbarType.neutral)
    }
  }

  return {
    handleAddCrytoAccount,
    handleDeleteCryptoAccount,
    handleEditCryptoAccount,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  }
}
