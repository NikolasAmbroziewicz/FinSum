import { AccountSchemaType } from 'src/features/Accounts/validators';

export interface AccountsState {
  accounts: AccountSchemaType[];
  isLoading: boolean;
}
