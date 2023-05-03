import { useState } from 'react'

import H1 from "src/shared/components/headers/H1"
import H2 from 'src/shared/components/headers/H2'
import BaseButton from 'src/shared/components/button/base/BaseButton'
import BaseModal from 'src/shared/components/modals/BaseModal'

import Calendar from 'src/features/income/components/Calendar'
import IncomeForm from 'src/features/income/components/IncomeForm'

import { useModal } from 'src/shared/components/modals/hooks/useModal'

import { Position } from 'src/shared/components/headers/Header.types'

const IncomePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { handleOpenModal, isOpen} = useModal()

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <H1 styles='my-4' position={Position.left}>Income Page</H1>
        <p className='m-auto mr-2 text-gray-600'>Year:</p>
        <Calendar 
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>
      <div className='flex justify-end'>
        <BaseButton handler={handleOpenModal}>
          Add Income
        </BaseButton>
      </div>
      <div>
        <H2 position={Position.left}>{`List of Income ${startDate.getFullYear()}`}</H2>
      </div>
      <BaseModal 
        isOpen={isOpen}
        onClose={handleOpenModal}
        title='Add Income'
        content={
          <IncomeForm/>
        }
      />
    </div>
  )
}

export default IncomePage