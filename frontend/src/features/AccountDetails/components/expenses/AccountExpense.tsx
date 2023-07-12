import H2 from "src/shared/components/Headers/H2"
import BaseButton from "src/shared/components/Button/base/BaseButton"

import AccountExpensesList from "./AccountExpensesList"

const AccountExpense = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Expenses</H2>
        <BaseButton handler={()=>{}}>
          Add Expense
        </BaseButton>
      </div>
      <AccountExpensesList />
    </div>
  )
}

export default AccountExpense