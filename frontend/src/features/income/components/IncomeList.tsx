import { useSelector } from "react-redux"

import { getAllIncome, getLoadingStatus } from "src/store/income/incomeSlice"

import H2 from "src/shared/components/headers/H2"
import NotFound from "src/shared/components/not-found/NotFound"
import Loading from "src/shared/components/loading/Loading"
import BaseTable from "src/shared/components/table/BaseTable"

import IncomeForm from "src/features/income/components/IncomeForm"
import IncomeListElement from "src/features/income/components/IncomeListElement"
import IncomeListElementDelete from "./IncomeListElementDelete"
import IncomeListElementEdit from "./IncomeListElementEdit"

import { Position } from "src/shared/components/headers/Header.types"
import { LoadingPosition } from "src/shared/components/loading/types"

interface IIncomeList {
  startDate: Date
}

const IncomeList: React.FC<IIncomeList> = ({ startDate }) => {
  const income = useSelector(getAllIncome)
  const loading = useSelector(getLoadingStatus)

  return (
    <div className="h-full">
      <H2 position={Position.left}>{`List of Income ${startDate.getFullYear()}`}</H2>
      <div className="mt-4 h-full">
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) : income.length !== 0 ? (
            <>
              <BaseTable 
                headers={['Title', 'Amount', 'Currency', 'Date', 'Actions']}
                headerWidth={['50%', '10%', '10%', '15%', '15%']}
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
                      <div className="flex gap-2">
                        <IncomeListElementEdit 
                          income={element}
                        />
                        <IncomeListElementDelete 
                          income={element}
                        />
                      </div>
                    </IncomeListElement>
                  ))
                }
              </BaseTable>
            </>
            ): (
              <NotFound text={'No Income Found'} />
            )
        }
      </div>
    </div>
  )
}

export default IncomeList