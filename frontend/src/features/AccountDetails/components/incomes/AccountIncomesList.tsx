import { useSelector } from 'react-redux'

import { getAllIncomes, getLoadingStatus } from 'src/store/AccountsDetails/incomes/AccountDetailsIncomes'

import H2 from 'src/shared/components/Headers/H2';
import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';
import BaseTable from 'src/shared/components/Table/BaseTable';

import IncomeListElement from 'src/shared/components/List/IncomeListElement';
import IncomeListElementMobile from 'src/shared/components/List/IncomeListElementMobile';

import AccountIncomeListElementAction from './AccountIncomeListElementAction';

import { useScreen } from 'src/shared/hooks/useScreen'

import { Position } from 'src/shared/components/Headers/Header.types';
import { LoadingPosition } from 'src/shared/components/Loading/types';

interface IAccountIncomesList {
  account_id: number
}

const AccountIncomesList: React.FC<IAccountIncomesList> = ({ account_id }) => {
  const income = useSelector(getAllIncomes);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen()

  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) : income.length !== 0 ? (
            isMobileScreen() ? (
              <div className="flex gap-2 flex-col">
                {income.map((element) => (
                  <IncomeListElementMobile
                    key={element.id}
                    title={element.title}
                    amount={element.amount}
                    date={element.date}
                  >
                    <AccountIncomeListElementAction 
                      income={element}
                      account_id={account_id}
                    />
                  </IncomeListElementMobile>
                  ))}
              </div>
            ) : (
              <BaseTable
                headers={['Title', 'Amount', 'Date', '']}
                headerWidth={['1/2', '100px', '130px', '60px']}
              >
                {income.map((element) => (
                  <IncomeListElement
                    key={element.id}
                    title={element.title}
                    amount={element.amount}
                    date={element.date}
                  >
                    <AccountIncomeListElementAction 
                      income={element}
                      account_id={account_id}
                    />
                  </IncomeListElement>
                ))}
              </BaseTable>
            )
          ) : (
            <NotFound text={'No Income Found'} />
          )
        }
      </div>
    </div>
  )
}

export default AccountIncomesList