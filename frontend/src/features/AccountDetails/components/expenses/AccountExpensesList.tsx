import { useSelector } from 'react-redux';

import {
  getAllExpenses,
  getLoadingStatus
} from 'src/store/AccountsDetails/expenses/AccountDetailsExpensesSlice';

import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';
import BaseTable from 'src/shared/components/Table/BaseTable';
import ListElement from 'src/shared/components/List/ListElement';
import ListElementMobile from 'src/shared/components/List/ListElementMobile';

import { useScreen } from 'src/shared/hooks/useScreen';

import { LoadingPosition } from 'src/shared/components/Loading/types';

import AccountExpenseListAction from './AccountExpenseListAction';

interface IAccountExpensesList {
  account_id: number;
  date: Date
}

const AccountExpensesList: React.FC<IAccountExpensesList> = ({
  account_id,
  date
}) => {
  const expenses = useSelector(getAllExpenses);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen();

  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        {loading ? (
          <Loading position={LoadingPosition.start} />
        ) : expenses.length !== 0 ? (
          isMobileScreen() ? (
            <div className="flex gap-2 flex-col">
              {expenses.map((element) => (
                <ListElementMobile
                  key={element.id}
                  title={element.title}
                  amount={element.amount}
                  date={element.date}
                >
                  <AccountExpenseListAction 
                    date={date}
                    expense={element}
                    account_id={account_id}
                  />
                </ListElementMobile>
              ))}
            </div>
          ) : (
            <BaseTable
              headers={['Title', 'Amount', 'Date', '']}
              headerWidth={['1/2', '100px', '130px', '60px']}
            >
              {expenses.map((element) => (
                <ListElement
                  key={element.id}
                  title={element.title}
                  amount={element.amount}
                  date={element.date}
                >
                  <AccountExpenseListAction 
                    date={date}
                    expense={element}
                    account_id={account_id}
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

export default AccountExpensesList;
