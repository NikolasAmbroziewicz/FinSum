import FormElement from "src/features/auth/components/FormElement"

import BaseButton from "src/shared/components/button/base/BaseButton"
import BaseInput from "src/shared/components/input/base/BaseInput"
import BaseDropdownMenu from 'src/shared/components/dropdown/BaseDropdownMenu'

import IncomeFormCalendar from "./IncomeFormCalendar"


import { useIncome } from '../hooks/useIncome'

import { supportedCurrency } from 'src/pages/income/content'

interface IIncomeForm {
  onClose: () => void
}

const IncomeForm: React.FC<IIncomeForm> = ({ onClose }) => {
  const { handleAddIncome, errors, handleSubmit, register, setValue, getValues } = useIncome({onClose})

  const handleValue = (val: string) => {
    setValue('currency', val, { shouldValidate: true })
  }

  const handleDateValue = (val: Date) => {
    setValue('date', val, { shouldValidate: true})
  }

  return (
    <form onSubmit={handleSubmit(handleAddIncome)} className="flex flex-col gap-4 w-screen mx-4">
      <FormElement value="Title" error={errors.name?.message}>
        <BaseInput 
          id="name"
          type="text"
          placeholder="Title"
          error={!!errors.name?.message}
          formHandler={register('name')}
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
      <FormElement value="Date" error={errors.date?.message}>
        <IncomeFormCalendar date={getValues('date')} setDate={handleDateValue} />
      </FormElement>
      <FormElement value="Currency" error={errors.currency?.message}>
        <BaseDropdownMenu 
          dropdownContent={supportedCurrency}
          handleValue={handleValue}
          value={getValues('currency')} 
          error={!!errors.currency?.message}
        />
      </FormElement>
      <BaseButton type="submit">Add</BaseButton>
    </form>
  )
}

export default IncomeForm