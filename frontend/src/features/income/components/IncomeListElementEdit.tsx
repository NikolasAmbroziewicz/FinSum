import IncomeForm from 'src/features/income/components/IncomeForm'

import BaseModal from 'src/shared/components/modals/BaseModal'

import { useModal } from 'src/shared/components/modals/hooks/useModal'

import { AiFillEdit } from 'react-icons/ai'
import { IncomeSchemaType } from '../validators'

interface IIncomeListElementEdit {
  income: IncomeSchemaType
}

const IncomeListElementEdit: React.FC<IIncomeListElementEdit> = ({ income }) => {
  const { handleOpenModal, isOpen } = useModal()

  return (
    <>
      <AiFillEdit 
        className="cursor-pointer text-lg text-gray-600"
        onClick={handleOpenModal}
      />
      <BaseModal 
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Edit Income"
        content={
          <IncomeForm 
            onClose={handleOpenModal}
            editForm={true}
            income={income}
          />
        }
      />
    </>
  )
}

export default IncomeListElementEdit