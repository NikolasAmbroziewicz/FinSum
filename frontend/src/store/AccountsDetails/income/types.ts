import { AccountDetailsIncomeSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsIncome'

export type AccountIncomesState = {
  incomes: AccountDetailsIncomeSchemaType[],
  isLoading: boolean
}