import { useState } from 'react'
import { useParams } from "react-router-dom"

import AccountDetailsSummary from 'src/features/AccountDetails/components/AccountDetailsSummary'
import AccountExpense from 'src/features/AccountDetails/expenses/components/AccountExpense'
import AccountIncome from 'src/features/AccountDetails/incomes/components/AccountIncome'

const AccountDetailsPage = () => {
  const [activeIncomeTable, setActiveIncomeTable] = useState<boolean>(false)
  const params = useParams()

  const handleIncomePage = () => {
    setActiveIncomeTable(true)
  }

  const handleExpensePage = () => {
    setActiveIncomeTable(false)
  }

  return (
    <div>
      <AccountDetailsSummary />
      {
        activeIncomeTable ? (
          <AccountIncome handler={handleExpensePage}/>
        ) : (
          <AccountExpense handler={handleIncomePage}/>
        )
      }
    </div>
  )
}

export default AccountDetailsPage