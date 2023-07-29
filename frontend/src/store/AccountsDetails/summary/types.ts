export type AccountDetails = {
  total_income: number;
  total_expense: number;
  account: {
    currency: string;
  };
};

export type AccountDetailState = {
  details: AccountDetails;
  isLoading: boolean;
};
