import { useState } from 'react'

import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AppDispatch } from 'src/store/main';
import { incomeSchema, IncomeSchemaType } from 'src/features/income/validators'

import { addIncome } from 'src/store/income/incomeSlice';

export const useIncome = () => {
  const dispatch = useDispatch<AppDispatch>()
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
    dispatch(addIncome(value))
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

