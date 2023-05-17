
import { useModal } from 'src/shared/components/modals/hooks/useModal'

import { AiFillEdit } from 'react-icons/ai'
import { IncomeType } from '../validators'


interface IIncomeListElementEdit {
  income: IncomeType
}

const IncomeListElementEdit: React.FC<IIncomeListElementEdit> = () => {
  const { handleOpenModal, isOpen } = useModal()

  return (
    <>
      <AiFillEdit 
        className="cursor-pointer text-lg text-gray-600"
        onClick={handleOpenModal}
      />
    </>
  )
}

export default IncomeListElementEdit