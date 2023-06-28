import { useState, useEffect } from 'react';

import { AppDispatch } from 'src/store/main';
import { useDispatch } from 'react-redux';

import { getIncome } from 'src/store/Income/IncomeSlice';

import H1 from 'src/shared/components/Headers/H1';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';

import Calendar from 'src/shared/components/Calendar/Calendar';
import IncomeForm from 'src/features/Income/components/IncomeForm';
import IncomeList from 'src/features/Income/components/IncomeList';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { Position } from 'src/shared/components/Headers/Header.types';

const IncomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [startDate, setStartDate] = useState(new Date());

  const { handleOpenModal, isOpen } = useModal();

  useEffect(() => {
    const handleIncome = async () => {
      await dispatch(getIncome(startDate));
    };

    handleIncome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <H1 styles="my-4" position={Position.left}>
          Income Page
        </H1>
        <p className="m-auto mr-2 text-gray-600">Year:</p>
        <Calendar startDate={startDate} setStartDate={setStartDate} />
      </div>
      <div className="flex justify-end">
        <BaseButton handler={handleOpenModal}>Add Income</BaseButton>
      </div>
      <IncomeList startDate={startDate} />
      <BaseModal
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Income"
        content={<IncomeForm onClose={handleOpenModal} editForm={false} />}
      />
    </div>
  );
};

export default IncomePage;
