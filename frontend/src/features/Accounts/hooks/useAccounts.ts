
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { accountSchema, AccountSchemaType } from 'src/features/Accounts/validators'

interface IUseAccount {
  onClose?: () => void 
}

export const useAccount = (value: IUseAccount) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(accountSchema),
  })

  const handleAddAccounts = () => {
    console.log('handle Add Accounts')
  }

  const handleDeleteAccounts = () => {
    console.log('handle Delete Accounts')
  }

  const handleEditAccounts = () => {
    console.log('handle Edit Accounts')
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

