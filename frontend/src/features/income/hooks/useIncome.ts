import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { incomeSchema, incomeSchemaType } from 'src/features/income/validators'

export const useIncome = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<incomeSchemaType>({
    resolver: zodResolver(incomeSchema)
  })

  const handleAddIncome = (value: incomeSchemaType) => {
    console.log('handleAddIncome')
  }

  const handleEditIncome = (value: incomeSchemaType) => {
    console.log('handleEditIncome')
  }

  return {
    handleAddIncome,
    handleSubmit,
    errors,
    register,
  }
}

