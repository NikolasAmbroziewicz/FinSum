import { useEffect } from 'react'

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseInput from 'src/shared/components/Input/base/BaseInput';
import IncomeFormCalendar from 'src/shared/components/Calendar/IncomeFormCalendar';
import FormElement from 'src/shared/components/Form/FormElement';

import { useAccountExpense } from 'src/features/AccountDetails/hooks/useAccountExpense';
import { AccountDetailsExpenseSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsExpenses'

interface IAccountExpenseForm {
  onClose: () => void;
  editForm: boolean;
  income?: AccountDetailsExpenseSchemaType;
  account_id: number
}

const AccountExpenseForm: React.FC<IAccountExpenseForm> = ({
  account_id,
  editForm,
  income,
  onClose,
}) => {
  const {
    handleAddExpense, 
    handleEditExpense,
    errors,
    handleSubmit,
    register,
    setValue,
    getValues
  } = useAccountExpense({
    onClose: onClose,
  })

  const handleDateValue = (val: Date) => {
    setValue('date', val, { shouldValidate: true });
  };

  useEffect(() => {
    if (editForm && income) {
      setValue('id', income?.id);
      setValue('title', income.title);
      setValue('date', new Date(income.date));
      setValue('amount', income.amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
    onSubmit={
      handleSubmit(editForm ? 
        (data) => handleEditExpense(data): 
        (data) => handleAddExpense(data, account_id)
      )}
      className="flex flex-col gap-4 w-screen mx-4"
    >
      <FormElement value="Title" error={errors.title?.message}>
        <BaseInput
          id="name"
          type="text"
          placeholder="Title"
          error={!!errors.title?.message}
          formHandler={register('title')}
        />
      </FormElement>
      <FormElement value="Amount" error={errors.amount?.message}>
        <BaseInput
          id="amount"
          type="number"
          placeholder="Amount"
          error={!!errors.amount?.message}
          formHandler={register('amount')}
        />
      </FormElement>
      <FormElement value="Date" error={errors.date?.message}>
        <IncomeFormCalendar
          date={getValues('date')}
          setDate={handleDateValue}
        />
      </FormElement>
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  )
}

export default AccountExpenseForm