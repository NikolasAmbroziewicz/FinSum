import { useSelector } from 'react-redux';

import {
  getAllIncomes,
  getLoadingStatus
} from 'src/store/AccountsDetails/incomes/AccountDetailsIncomesSlice';

import AccountIncomeListAction from './AccountIncomeListAction';

import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';
import BaseTable from 'src/shared/components/Table/BaseTable';
import ListElement from 'src/shared/components/List/ListElement';
import ListElementMobile from 'src/shared/components/List/ListElementMobile';

import { useScreen } from 'src/shared/hooks/useScreen';

import { LoadingPosition } from 'src/shared/components/Loading/types';

interface IAccountIncomesList {
  account_id: number;
  startDate: Date;
}

const AccountIncomesList: React.FC<IAccountIncomesList> = ({
  account_id,
  startDate
}) => {
  const income = useSelector(getAllIncomes);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen();

  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        {loading ? (
          <Loading position={LoadingPosition.start} />
        ) : income.length !== 0 ? (
          isMobileScreen() ? (
            <div className="flex gap-2 flex-col">
              {income.map((element) => (
                <ListElementMobile
                  key={element.id}
                  title={element.title}
                  amount={element.amount}
                  date={element.date}
                >
                  <AccountIncomeListAction
                    account_id={account_id}
                    date={startDate}
                    income={element}
                  />
                </ListElementMobile>
              ))}
            </div>
          ) : (
            <BaseTable
              headers={['Title', 'Amount', 'Date', '']}
              headerWidth={['1/2', '100px', '130px', '60px']}
            >
              {income.map((element) => (
                <ListElement
                  key={element.id}
                  title={element.title}
                  amount={element.amount}
                  date={element.date}
                >
                  <AccountIncomeListAction
                    account_id={account_id}
                    date={startDate}
                    income={element}
                  />
                </ListElement>
              ))}
            </BaseTable>
          )
        ) : (
          <NotFound text={'No Income Found'} />
        )}
      </div>
    </div>
  );
};

export default AccountIncomesList;
