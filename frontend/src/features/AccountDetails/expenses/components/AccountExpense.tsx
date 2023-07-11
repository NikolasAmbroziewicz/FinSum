import H2 from "src/shared/components/Headers/H2"
import BaseButton from "src/shared/components/Button/base/BaseButton"

import { Position } from "src/shared/components/Headers/Header.types"

interface IAccountExpense {
  handler: () => void
}


const AccountExpense: React.FC<IAccountExpense> = ({ handler }) => {
  return (
    <div className="flex justify-between items-center">
      <H2>Expenses</H2>
      <BaseButton handler={handler}>
        Income Details
      </BaseButton>
    </div>
  )
}

export default AccountExpense