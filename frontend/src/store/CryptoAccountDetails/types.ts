import { CryptoCurrencyDetailsSchemaType } from 'src/features/CryptoAccountDetails/validators'

export interface CryptoAccountDetailsState {
  cryptoCurrency: CryptoCurrencyDetailsSchemaType[];
  isLoading: boolean;
}