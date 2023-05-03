import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { incomeSchema, IncomeSchemaType } from 'src/features/income/validators'

export const useIncome = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IncomeSchemaType>({
    resolver: zodResolver(incomeSchema)
  })

  const handleAddIncome = (value: IncomeSchemaType) => {
    console.log('handleAddIncome')
  }

  const handleEditIncome = (value: IncomeSchemaType) => {
    console.log('handleEditIncome')
  }

  return {
    handleAddIncome,
    handleSubmit,
    errors,
    register,
  }
}

