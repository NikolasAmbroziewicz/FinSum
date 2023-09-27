import { CryptoCurrencySummary } from 'src/features/CryptoAccountDetails/validators'

export interface CryptoAccountSummaryState {
  currency: CryptoCurrencySummary[],
  isLoading: boolean
}