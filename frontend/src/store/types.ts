import { IncomeSchemaType } from 'src/features/income/validators';

export type Tokens = {
  refreshToken?: string;
  accessToken?: string;
};

export interface UserStore {
  isAuthenticated: boolean;
  user?: {
    email: string;
    name: string;
    surname: string;
  };
  tokens: Tokens;
}

export interface IncomeState {
  income: IncomeSchemaType[];
  isLoading: boolean;
}

export type MainStoreType = {
  auth: UserStore;
  income: IncomeState;
};
