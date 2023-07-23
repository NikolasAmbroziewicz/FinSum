import { IncomeSchemaType } from 'src/features/Income/validators';

export interface IncomeState {
  income: IncomeSchemaType[];
  isLoading: boolean;
}
