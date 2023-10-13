import { CryptoCurrencySummary } from 'src/features/CryptoAccountDetails/validators'

type AccountsDetails = {
  cash: string,
  expense: string
}

export interface AccountDetailsSummary {
  [item: number]: AccountsDetails
}

type IncomeDetails = {
  currency: string,
  sum: number
}

export interface IncomeDetailsSummary {
  available_currency: string[]
  details: {
    [item: number]: IncomeDetails[]
  }
}

export interface DashboardSlice {
  accountDetails: {
    isLoading: boolean,
    accountDetails: AccountDetailsSummary
  },
  income: {
    isLoading: boolean
    incomes: IncomeDetailsSummary
  },
  cryptoCurrency: {
    isLoading: boolean,
    cryptoSummary: CryptoCurrencySummary[]
  }
}