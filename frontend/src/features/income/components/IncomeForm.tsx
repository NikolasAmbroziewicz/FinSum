import { useForm } from 'react-hook-form'

import FormElement from "src/features/auth/components/FormElement"
import BaseButton from "src/shared/components/button/base/BaseButton"
import BaseInput from "src/shared/components/input/base/BaseInput"

import { useIncome } from '../hooks/useIncome'

const IncomeForm = () => {
  const { handleAddIncome, errors, handleSubmit, register } = useIncome()

  return (
    <form onSubmit={handleSubmit(handleAddIncome)} className="flex flex-col gap-4 w-screen mx-4">
      <FormElement value="Name" error={errors.name?.message}>
        <BaseInput 
          id="name"
          type="text"
          placeholder="Name"
          error={!!errors.name?.message}
          formHandler={register('name')}
        />
      </FormElement>
      <FormElement value="Currency" error={errors.currency?.message}>
        <BaseInput 
          id="currency"
          type="text"
          placeholder="Currency"
          error={!!errors.name?.message}
          formHandler={register('currency')}
        />
      </FormElement>
      <FormElement value='Amount' error={errors.amount?.message}>
        <BaseInput 
          id="amount"
          type="number"
          placeholder="Amount"
          error={!!errors.name?.message}
          formHandler={register('amount')}
        />
      </FormElement>
      <BaseButton type="submit">Add</BaseButton>
    </form>
  )
}

export default IncomeForm