import { useEffect } from 'react'

import { useCryptoAccounts } from '../hooks/useCryptoAccounts'

import BaseButton from 'src/shared/components/Button/base/BaseButton'
import BaseInput from 'src/shared/components/Input/base/BaseInput'
import FormElement from 'src/shared/components/Form/FormElement'

import { CryptoAccountSchemaType } from '../validators'

interface ICryptoAccountsForm {
  onClose: () => void,
  editForm?: boolean,
  account?: CryptoAccountSchemaType
}

const CryptoCurrencyForm: React.FC<ICryptoAccountsForm> = ({
  onClose,
  editForm,
  account
}) => {
  const {
    handleAddCrytoAccount,
    handleEditCryptoAccount,
    errors,
    handleSubmit,
    register,
    setValue,
  } = useCryptoAccounts({ onClose: onClose })

  useEffect(() => {
    if(editForm && account) {
      setValue('id', account.id)
      setValue('title', account.title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form 
      onSubmit={handleSubmit(editForm ? handleEditCryptoAccount : handleAddCrytoAccount)}
      className="flex flex-col gap-4 w-screen mx-4"
    >
      <FormElement value='Title' error={errors.title?.message}>
        <BaseInput 
          id="title"
          type="text"
          placeholder="Title"
          error={!!errors.title?.message}
          formHandler={register('title')}
        />
      </FormElement>
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  )
  
}

export default CryptoCurrencyForm