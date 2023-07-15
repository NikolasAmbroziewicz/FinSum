import { useParams } from "react-router-dom"

import H2 from "src/shared/components/Headers/H2"
import BaseButton from "src/shared/components/Button/base/BaseButton"
import BaseModal from 'src/shared/components/Modals/BaseModal'

import AccountExpenseForm from "./AccountExpenseForm"
import AccountExpensesList from "./AccountExpensesList"

import { useModal } from 'src/shared/components/Modals/hooks/useModal'

const AccountExpense = () => {
  const params = useParams()
  const { handleOpenModal, isOpen } = useModal()
  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Expenses</H2>
        <BaseButton handler={handleOpenModal}>
          Add Expense
        </BaseButton>
      </div>
      <AccountExpensesList />
      <BaseModal 
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Expense"
        content={
          <AccountExpenseForm 
            onClose={handleOpenModal} 
            editForm={false} 
            account_id={Number(params['accountId'])} />
        }
      />
    </div>
  )
}

export default AccountExpense