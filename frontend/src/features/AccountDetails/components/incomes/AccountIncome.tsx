import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'src/store/main';
import { getAccountIncomes } from 'src/store/AccountsDetails/incomes/AccountDetailsIncomesSlice';

import H2 from 'src/shared/components/Headers/H2';
import BaseButton from 'src/shared/components/Button/base/BaseButton';
import BaseModal from 'src/shared/components/Modals/BaseModal';

import AccountIncomeForm from './AccountIncomeForm';
import AccountIncomesList from './AccountIncomesList';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

interface IAccountIncome {
  startDate: Date;
}

const AccountIncome: React.FC<IAccountIncome> = ({ startDate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleOpenModal, isOpen } = useModal();
  const params = useParams();

  useEffect(() => {
    dispatch(
      getAccountIncomes({
        date: startDate,
        account_id: Number(params['accountId'])
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <H2>Incomes</H2>
        <div className="flex gap-2">
          <BaseButton handler={handleOpenModal}>Add Income</BaseButton>
        </div>
      </div>
      <AccountIncomesList
        account_id={Number(params['accountId'])}
        startDate={startDate}
      />
      <BaseModal
        isOpen={isOpen}
        onClose={handleOpenModal}
        title="Add Income"
        content={
          <AccountIncomeForm
            onClose={handleOpenModal}
            editForm={false}
            account_id={Number(params['accountId'])}
            startDate={startDate}
          />
        }
      />
    </div>
  );
};

export default AccountIncome;
