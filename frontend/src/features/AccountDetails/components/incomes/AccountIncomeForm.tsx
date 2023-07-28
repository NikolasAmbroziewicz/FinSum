import { useEffect } from 'react';

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseInput from 'src/shared/components/Input/base/BaseInput';
import IncomeFormCalendar from 'src/shared/components/Calendar/IncomeFormCalendar';
import FormElement from 'src/shared/components/Form/FormElement';

import { useAccountIncome } from 'src/features/AccountDetails/hooks/useAccountIncome';
import { AccountDetailsIncomeSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsIncomes';

interface IAccountIncomeForm {
  onClose: () => void;
  editForm: boolean;
  income?: AccountDetailsIncomeSchemaType;
  account_id: number;
  startDate: Date
}

const AccountIncomeForm: React.FC<IAccountIncomeForm> = ({
  account_id,
  editForm,
  income,
  onClose,
  startDate
}) => {
  const {
    handleAddIncome,
    handleEditIncome,
    errors,
    handleSubmit,
    register,
    setValue,
    getValues
  } = useAccountIncome({
    onClose: onClose,
    account_id: account_id,
    date: startDate
  });

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
      onSubmit={handleSubmit(
        editForm
          ? (data) => handleEditIncome(data)
          : (data) => handleAddIncome(data)
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
  );
};

export default AccountIncomeForm;
