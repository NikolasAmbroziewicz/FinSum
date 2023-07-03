import { useState, useEffect } from 'react';

import { AppDispatch } from 'src/store/main';
import { useDispatch } from 'react-redux';

import { getIncome } from 'src/store/Income/IncomeSlice';

import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';
import PageHeader from 'src/shared/components/PageHeader/PageHeader';

import IncomeForm from 'src/features/Income/components/IncomeForm';
import IncomeList from 'src/features/Income/components/IncomeList';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

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

  const handleDateSetDate = (date: Date) => {
    setStartDate(date)
  }

  return (
    <div className="flex flex-col">
      <PageHeader 
        setStartDate={handleDateSetDate}
        startDate={startDate}
        title='Income Page'
      >
        <BaseButton handler={handleOpenModal}>Add Income</BaseButton>
      </PageHeader>
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
