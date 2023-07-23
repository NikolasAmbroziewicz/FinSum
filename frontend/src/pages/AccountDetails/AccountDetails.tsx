import AccountDetailsSummary from 'src/features/AccountDetails/components/AccountDetailsSummary';
import AccountExpense from 'src/features/AccountDetails/components/expenses/AccountExpense';
import AccountIncome from 'src/features/AccountDetails/components/incomes/AccountIncome';

const AccountDetailsPage = () => {
  return (
    <div>
      <AccountDetailsSummary />
      <AccountIncome />
      <AccountExpense />
    </div>
  );
};

export default AccountDetailsPage;
