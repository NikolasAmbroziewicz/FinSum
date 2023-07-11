import H2 from "src/shared/components/Headers/H2"
import BaseButton from "src/shared/components/Button/base/BaseButton"

import { Position } from "src/shared/components/Headers/Header.types"

interface IAccountIncome {
  handler: () => void
}

const AccountIncome: React.FC<IAccountIncome> = ({ handler }) => {
  return (
    <div className="flex justify-between items-center">
      <H2>Incomes</H2>
      <BaseButton handler={handler}>
        Expense Details
      </BaseButton>
    </div>
  )
}

export default AccountIncome