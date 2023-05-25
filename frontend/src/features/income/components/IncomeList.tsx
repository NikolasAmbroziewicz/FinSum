import { useSelector } from "react-redux"

import { getAllIncome, getLoadingStatus } from "src/store/income/incomeSlice"

import H2 from "src/shared/components/headers/H2"
import NotFound from "src/shared/components/not-found/NotFound"
import Loading from "src/shared/components/loading/Loading"
import BaseTable from "src/shared/components/table/BaseTable"

import IncomeListElement from "src/features/income/components/IncomeListElement"
import IncomeListElementMobile from "src/features/income/components/IncomeListElementMobile"
import IncomeListElementActions from "./IncomeListElementActions"

import { useScreen } from "src/shared/hooks/useScreen"

import { Position } from "src/shared/components/headers/Header.types"
import { LoadingPosition } from "src/shared/components/loading/types"

interface IIncomeList {
  startDate: Date
}

const IncomeList: React.FC<IIncomeList> = ({ startDate }) => {
  const income = useSelector(getAllIncome)
  const loading = useSelector(getLoadingStatus)

  const { isMobileScreen } = useScreen()

  return (
    <div className="h-full">
      <H2 position={Position.left}>{`List of Income ${startDate.getFullYear()}`}</H2>
      <div className="mt-4 h-full">
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) : income.length !== 0 ? (
              isMobileScreen() ? (
                (
                  <div className="flex gap-2 flex-col">
                    {
                  income.map((element) => (
                    <IncomeListElementMobile 
                      key={element.id}
                      title={element.title}
                      currency={element.currency}
                      amount={element.amount}
                      date={element.date}
                    >
                      <IncomeListElementActions income={element} />
                    </IncomeListElementMobile>
                  ))
                  }
                </div>
                )
              ): (
                <BaseTable 
                  headers={['Title', 'Amount', 'Currency', 'Date', '']}
                  headerWidth={['1/2', '100px', '60px', '130px', '30px']}
                >
                  {
                    income.map((element) => (
                      <IncomeListElement
                        key={element.id}
                        title={element.title}
                        currency={element.currency}
                        amount={element.amount}
                        date={element.date}
                      >
                        <IncomeListElementActions income={element} />
                      </IncomeListElement>
                    ))
                  }
                </BaseTable>
              )
            ): (
              <NotFound text={'No Income Found'} />
            )
        }
      </div>
    </div>
  )
}

export default IncomeList