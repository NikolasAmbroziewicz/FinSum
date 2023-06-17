import { IncomeSchemaType } from 'src/features/income/validators';

export interface IncomeState {
  income: IncomeSchemaType[];
  isLoading: boolean;
}