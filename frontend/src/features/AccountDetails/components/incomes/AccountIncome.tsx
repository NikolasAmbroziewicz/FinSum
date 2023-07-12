import H2 from "src/shared/components/Headers/H2"
import BaseButton from "src/shared/components/Button/base/BaseButton"

import AccountIncomesList from "./AccountIncomesList"

const AccountIncome = () => {
  const handleAddIncome = () => {
    console.log('add income')
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Incomes</H2>
        <div className="flex gap-2">
          <BaseButton handler={handleAddIncome}>
            Add Income
          </BaseButton>
        </div>
      </div>
      <AccountIncomesList />
    </div>
  )
}

export default AccountIncome