import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'src/store/main';

import Calendar from 'src/shared/components/Calendar/Calendar';
import H4 from "src/shared/components/Headers/H4"

import { getIncomeDetails, getIncomeDetailsList } from 'src/store/Dashboard/DashboardSlice'

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
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const IncomesPanel = () => {
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch<AppDispatch>();
  const incomesList = useSelector(getIncomeDetailsList)

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

  const dataMemo = useMemo(() => {
    return {
      labels,
      datasets: incomesList.available_currency.map((val) => {
        return {
          label: val,
          data: getData(val),
          backgroundColor: chartsColors[val],
        }
      })
    }
  }, [incomesList])

  return (
    <div className="flex flex-col bg-red-100">
      <div className="flex justify-between align-top p-2">
        <H4 styles="p-2" position={Position.left}>Incomes Panel</H4>
        <Calendar startDate={date} setStartDate={setDate} yearCalendar={true} />
      </div>
      <div>
        <Bar options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart',
              },
            },
          }} 
          data={dataMemo} 
        />
      </div>
    </div>
  )
}

export default IncomesPanel