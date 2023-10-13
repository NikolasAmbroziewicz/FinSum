import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'src/store/main';

import Loading from "src/shared/components/Loading/Loading";
import Calendar from 'src/shared/components/Calendar/Calendar';
import H4 from "src/shared/components/Headers/H4"
import NotFound from 'src/shared/components/NotFound/NotFound';

import { getIncomeDetails, getIncomeDetailsList, getIncomeDetailsLoading, isIncomeDetailsEmpty } from 'src/store/Dashboard/DashboardSlice'

import { Position } from 'src/shared/components/Headers/Header.types'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartsColors: {
  [item: string]: string
} = {
  'PLN': 'rgba(255, 99, 132, 0.5)',
  'USD': 'rgba(99, 255, 132, 0.5)',
  'EUR': 'rgba(132, 99, 255, 0.5)',
  'CHF': 'rgba(255, 99, 132, 0.5)',
  'GBP': 'rgba(255, 99, 132, 0.5)'
}
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const IncomesPanel = () => {
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch<AppDispatch>();

  const incomesList = useSelector(getIncomeDetailsList)
  const incomesLoading = useSelector(getIncomeDetailsLoading)
  const incomeDetailsEmpty = useSelector(isIncomeDetailsEmpty)

  useEffect(() => {
    dispatch(
      getIncomeDetails(
        date
      )
    )
  }, [date])

  const getData = (currency: string) => {
    const value = new Array(12).fill(0)

    Object.keys(incomesList.details).forEach((key) => {
      if (incomesList.details[Number(key)] === undefined) return 

      incomesList.details[Number(key)].forEach((item: any) => {
        if(item.currency === currency) {
          value[Number(key)-1] = item.sum
        }
      })
    })

    return value
  }

  return (
    <div className="flex flex-col border-1 border-solid border border-slate-300 p-2">
      <div className="flex justify-between align-top p-2">
        <H4 styles="p-2" position={Position.left}>Incomes Panel</H4>
        <Calendar startDate={date} setStartDate={setDate} yearCalendar={true} />
      </div>
        {
          incomesLoading ? (
            <Loading />
          ) : (
            incomeDetailsEmpty ? (
              <div className="m-auto">
                <NotFound text="No Data Found" />
              </div>
            ) : (
              <div className="flex justify-center min-h-[35vh]">
                  <Bar
                    className="max-w-2xl"
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: false,
                          text: 'Chart.js Bar Chart',
                        },
                      },
                    }} 
                    data={{
                      labels,
                      datasets: incomesList.available_currency.map((val) => {
                        return {
                          label: val,
                          data: getData(val),
                          backgroundColor: chartsColors[val],
                        }
                      })
                    }} 
                  />
              </div>
            )
          )
        }
    </div>
  )
}

export default IncomesPanel