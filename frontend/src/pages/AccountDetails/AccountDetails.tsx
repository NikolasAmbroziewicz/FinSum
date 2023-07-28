import { useState } from 'react';

import AccountDetailsSummary from 'src/features/AccountDetails/components/summary/AccountDetailsSummary';
import AccountExpense from 'src/features/AccountDetails/components/expenses/AccountExpense';
import AccountIncome from 'src/features/AccountDetails/components/incomes/AccountIncome';

const AccountDetailsPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <AccountDetailsSummary
        setStartDate={setStartDate}
        startDate={startDate}
      />
      <AccountIncome startDate={startDate} />
      <AccountExpense startDate={startDate} />
    </div>
  );
};

export default AccountDetailsPage;
