import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';

import { accountSchema, AccountSchemaType } from 'src/features/Accounts/validators'

import {
  addAccount,
  deleteAccount,
  editAccount
} from 'src/store/Accounts/AccountsSlice'

interface IUseAccount {
  onClose?: () => void 
}

export const useAccount = ({ onClose = undefined }: IUseAccount) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(accountSchema),
  })

  const handleAddAccounts = (value: AccountSchemaType) => {
    dispatch(addAccount(value))

    if(onClose) {
      onClose()
    }
  }

  const handleDeleteAccounts = (id: number) => {
    dispatch(deleteAccount(id))

    if(onClose) {
      onClose()
    }
  }

  const handleEditAccounts = (value: AccountSchemaType) => {
    dispatch(editAccount(value))

    if(onClose) {
      onClose()
    }
  }

  return {
    handleAddAccounts,
    handleDeleteAccounts,
    handleEditAccounts,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  }
}

