import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { incomeSchema, IncomeSchemaType } from 'src/features/income/validators'

export const useIncome = () => {
  const [date, setDate] = useState(new Date())
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm<IncomeSchemaType>({
    resolver: zodResolver(incomeSchema)
  })

  const handleAddIncome = (value: IncomeSchemaType) => {
    console.log('handleAddIncome', value)
  }

  const handleEditIncome = (value: IncomeSchemaType) => {
    console.log('handleEditIncome')
  }

  return {
    date,
    setDate,
    handleAddIncome,
    handleSubmit,
    errors,
    register,
    setValue,
    getValues
  }
}

