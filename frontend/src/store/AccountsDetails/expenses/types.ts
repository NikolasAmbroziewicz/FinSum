import { AccountDetailsExpenseSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsExpenses'

export type AccountExpensesState = {
  expenses: AccountDetailsExpenseSchemaType[],
  isLoading: boolean
}