import { useSelector } from 'react-redux';

import { getAllIncome, getLoadingStatus } from 'src/store/Incomes/IncomesSlice';

import H2 from 'src/shared/components/Headers/H2';
import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';
import BaseTable from 'src/shared/components/Table/BaseTable';
import ListElement from 'src/shared/components/List/ListElement';
import ListElementMobile from 'src/shared/components/List/ListElementMobile';

import IncomeListAction from './IncomeListAction';

import { useScreen } from 'src/shared/hooks/useScreen';

import { Position } from 'src/shared/components/Headers/Header.types';
import { LoadingPosition } from 'src/shared/components/Loading/types';

interface IIncomeList {
  startDate: Date;
}

const IncomeList: React.FC<IIncomeList> = ({ startDate }) => {
  const income = useSelector(getAllIncome);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen();

  return (
    <div className="h-full">
      <H2
        position={Position.left}
      >{`List of Income ${startDate.getFullYear()}`}</H2>
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
                  currency={element.currency}
                  amount={element.amount}
                  date={element.date}
                >
                  <IncomeListAction income={element} />
                </ListElementMobile>
              ))}
            </div>
          ) : (
            <BaseTable
              headers={['Title', 'Amount', 'Currency', 'Date', '']}
              headerWidth={['1/2', '100px', '60px', '130px', '30px']}
            >
              {income.map((element) => (
                <ListElement
                  key={element.id}
                  title={element.title}
                  currency={element.currency}
                  amount={element.amount}
                  date={element.date}
                >
                  <IncomeListAction income={element} />
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

export default IncomeList;
