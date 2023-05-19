import BaseModal from "src/shared/components/modals/BaseModal"
import BaseButton from 'src/shared/components/button/base/BaseButton'


import { useModal } from 'src/shared/components/modals/hooks/useModal'
import { useIncome } from 'src/features/income/hooks/useIncome'

import { ButtonTheme } from 'src/shared/components/button/base/types'
import { IncomeSchemaType } from "src/features/income/validators"

import { AiFillEdit, AiOutlineClose } from 'react-icons/ai'

interface IIncomeListElementDelete {
  income: IncomeSchemaType
}

const IncomeListElementDelete: React.FC<IIncomeListElementDelete> =({ income })=> {
  const { isOpen, handleOpenModal } = useModal()

  const {
    handleDeleteIncome,
  }  = useIncome({
    onClose: handleOpenModal
  })

  return (
    <>
      <AiOutlineClose 
        className="cursor-pointer text-lg text-gray-600"
        onClick={handleOpenModal}
      />
      <BaseModal
        isOpen={isOpen}
        onClose={handleOpenModal}
        title='Delete Income'
        content={
          <span className='text-gray-600'>Do you want do delete this Income</span>
        }
        action={
          <>
            <BaseButton color={ButtonTheme.base} styles="w-[45%]" handler={() => handleDeleteIncome(income.id as number)}>
              Yes
            </BaseButton>
            <BaseButton color={ButtonTheme.error} styles="w-[45%]" handler={() => handleOpenModal()}>
              No
            </BaseButton>
          </>
        }
      />
    </>
  )
}

export default IncomeListElementDelete