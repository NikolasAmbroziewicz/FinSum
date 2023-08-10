import { CryptoAccountSchemaType } from 'src/features/CryptoAccounts/validators'

export interface CryptoAccountsState {
  accounts: CryptoAccountSchemaType[];
  isLoading: boolean;
}