import { useState } from 'react'
import { useParams } from "react-router-dom"

import AccountDetailsSummary from 'src/features/AccountDetails/components/AccountDetailsSummary'
import AccountExpense from 'src/features/AccountDetails/components/expenses/AccountExpense'
import AccountIncome from 'src/features/AccountDetails/components/incomes/AccountIncome'

const AccountDetailsPage = () => {
  const params = useParams()

  return (
    <div>
      <AccountDetailsSummary />
      <AccountIncome />
      <AccountExpense />
    </div>
  )
}

export default AccountDetailsPage