import { useSelector } from "react-redux"

import { getAllIncome, getLoadingStatus } from "src/store/income/incomeSlice"

import H2 from "src/shared/components/headers/H2"
import NotFound from "src/shared/components/not-found/NotFound"
import Loading from "src/shared/components/loading/Loading"

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
              <div>
                Income List
              </div>
            ): (
              <NotFound text={'No Income Found'} />
            )
        }

      </div>
    </div>
  )
}

export default IncomeList