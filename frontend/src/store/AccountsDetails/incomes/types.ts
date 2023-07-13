import { AccountDetailsIncomeSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsIncomes'

export type AccountIncomesState = {
  incomes: AccountDetailsIncomeSchemaType[],
  isLoading: boolean
}