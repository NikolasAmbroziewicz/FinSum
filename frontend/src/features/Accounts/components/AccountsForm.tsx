import { useEffect } from 'react';

import { useAccount } from '../hooks/useAccounts';

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseInput from 'src/shared/components/Input/base/BaseInput';
import FormElement from 'src/shared/components/Form/FormElement';
import ButtonDropdownMenu from 'src/shared/components/Dropdown/ButtonDropdownMenu';

import { AccountSchemaType } from '../validators';

import { supportedCurrency } from 'src/shared/data/SupportedCurrencies';
import { DropdownContent } from 'src/shared/components/Dropdown/types';

interface IAccountsForm {
  onClose: () => void;
  editForm?: boolean;
  account?: AccountSchemaType;
}

const AccountsForm: React.FC<IAccountsForm> = ({
  onClose,
  editForm,
  account
}) => {
  const {
    handleAddAccounts,
    handleEditAccounts,
    errors,
    handleSubmit,
    register,
    setValue,
    getValues
  } = useAccount({ onClose: onClose });

  useEffect(() => {
    if (editForm && account) {
      setValue('id', account?.id);
      setValue('title', account.title);
      setValue('currency', account.currency, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValue = (val: DropdownContent) => {
    setValue('currency', val.content, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(editForm ? handleEditAccounts : handleAddAccounts)}
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
      <FormElement value="Currency" error={errors.currency?.message}>
        <ButtonDropdownMenu
          dropdownContent={supportedCurrency}
          handleValue={handleValue}
          value={getValues('currency')}
          error={!!errors.currency?.message}
        />
      </FormElement>
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  );
};

export default AccountsForm;
