import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseInput from 'src/shared/components/Input/base/BaseInput';
import IncomeFormCalendar from 'src/shared/components/Calendar/IncomeFormCalendar';
import FormElement from 'src/shared/components/Form/FormElement';
import SearchDropdownMenu from 'src/features/CryptoAccountDetails/components/SearchCryptoDropdownMenu';
import InputLabel from 'src/shared/components/Input/label/InputLabel';

import { useCryptoCurrency } from '../hooks/useCryptoCurrency'
import { CryptoCurrencyDetailsSchemaType } from '../validators'

interface ICryptoCurrencyForm {
  onClose: () => void,
  editForm?: boolean,
  cryptoCurrency?: CryptoCurrencyDetailsSchemaType,
  accountId: number
}

const CryptoCurrencyForm: React.FC<ICryptoCurrencyForm> = ({
  onClose,
  editForm = false,
  accountId,
}) => {
  const {
    handleAddCryptoCurrency,
    handleEditCryptoCurrency,
    errors,
    handleSubmit,
    register,
    setValue,
    getValues,
  } = useCryptoCurrency({
    onClose: onClose,
    accountId: accountId
  })

  const handleDateBoughtValue = (val: Date) => {
    setValue('date_bought', val, { shouldValidate: true });
  };

  const handleDateSoldValue = (val: Date) => {
    setValue('date_sold', val, { shouldValidate: true });
  };

  const handleSetNameValue = (val: string) => {
    setValue('name', val, { shouldValidate: true })
  }

  const handleSetTickerValue = (val: string) => {
    setValue('ticker', val, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit( 
        editForm 
          ? (data) => handleEditCryptoCurrency(data)
          : (data) => handleAddCryptoCurrency(data)
      )}
      className="flex flex-col gap-4 w-screen mx-4"
    >
      <FormElement value="Crypto Currency" error={errors.name?.message || errors.ticker?.message}>
        <SearchDropdownMenu 
          error={!!errors.name?.message || !!errors.ticker?.message}
          setName={handleSetNameValue}
          setTicker={handleSetTickerValue}
        
        />
      </FormElement>
      <FormElement value="Amount" error={errors.amount?.message}>
        <BaseInput 
          id="amount"
          type="number"
          placeholder="Amount"
          error={!!errors.amount?.message}
          formHandler={register('amount')}
          step='0.01'
        />
      </FormElement>
      <FormElement value="Price Bought (USD)" error={errors.price_bought?.message}>
        <BaseInput 
          id="priceBought"
          type="number"
          placeholder="Price Bought"
          error={!!errors.price_bought?.message}
          formHandler={register('price_bought')}
        />
      </FormElement>
      <FormElement value="Date Bought" error={errors.date_bought?.message}>
        <IncomeFormCalendar
          date={getValues('date_bought')}
          setDate={handleDateBoughtValue}
        />
      </FormElement>
      <InputLabel value='Optional' />
      <FormElement value="Price Sold (USD)" error={errors.price_sold?.message}>
        <BaseInput 
          id="priceSold"
          type="number"
          placeholder="Price Sold"
          error={!!errors.price_sold?.message}
          formHandler={register('price_sold')}
        />
      </FormElement>
      <FormElement value="Date Sold" error={errors.date_sold?.message}>
        <IncomeFormCalendar
          date={getValues('date_sold')}
          setDate={handleDateSoldValue}
        />
      </FormElement>
      <FormElement value="Stock Name" error={errors.stock_name?.message}>
        <BaseInput 
          id="stockName"
          type="string"
          placeholder="Stock Name"
          error={!!errors.stock_name?.message}
          formHandler={register('stock_name')}
        />
      </FormElement>
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  )
}

export default CryptoCurrencyForm