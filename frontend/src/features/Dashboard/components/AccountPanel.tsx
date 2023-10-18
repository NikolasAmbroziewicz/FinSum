import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from 'src/store/main';

import H4 from "src/shared/components/Headers/H4"

import Loading from "src/shared/components/Loading/Loading";
import Calendar from 'src/shared/components/Calendar/Calendar';
import ButtonDropdownMenu from 'src/shared/components/Dropdown/ButtonDropdownMenu';

import { Position } from 'src/shared/components/Headers/Header.types'

import { getAccounts, getAllAccounts } from 'src/store/Accounts/AccountsSlice'
import { getAccountsDetails, getAccountDetailsList, getAccountsDetailsLoading } from 'src/store/Dashboard/DashboardSlice'

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
import { DropdownContent } from 'src/shared/components/Dropdown/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AccountPanel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const allAccounts = useSelector(getAllAccounts);
  const accountDetails = useSelector(getAccountDetailsList);
  const accountDetailsLoading = useSelector(getAccountsDetailsLoading);

  const [date, setDate] = useState(new Date())
  const [activeAccount, setActiveAccount] = useState<DropdownContent | null>(null)

  const handleGetAccountDetails = async (id: number) => {
    await dispatch(getAccountsDetails({
      account_id: id as number,
      date: date
    }))
  }

  const fetchData = async () => {
    const account = await dispatch(getAccounts()).unwrap();

    handleAccountChange({
      id: account[0].id as number,
      content: account[0].title
    })

    await handleGetAccountDetails(account[0].id as number)
  }

  const formatData = (attribute: string) => {
    const value = new Array(12).fill(0)

    Object.keys(accountDetails).forEach((key) => {

      if(attribute === 'cash') {
        value[Number(key)-1] = accountDetails[Number(key)].cash
      } else {
        value[Number(key)-1] = accountDetails[Number(key)].expense
      }

    })

    return value
  }

  const handleAccountChange = (val: DropdownContent) => {
    if (activeAccount?.id !== val.id) {
      setActiveAccount({
        id: val.id,
        content: val.content
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(activeAccount !== null) {
      handleGetAccountDetails(activeAccount?.id as number)
    }
  }, [activeAccount, date])

  return (
    <div className="flex flex-col border-1 border-solid border border-slate-300 p-2">
      <div className="flex justify-between align-top p-2">
        <H4 styles="p-2" position={Position.left}>Account Panel</H4>
        <div className='flex gap-2'>
          <Calendar startDate={date} setStartDate={setDate} yearCalendar={true} />
          <ButtonDropdownMenu
            dropdownContent={allAccounts.map((account) => ({
              id: account.id as number,
              content: account.title
            }))}
            value={activeAccount?.content as string}
            handleValue={handleAccountChange}
            error={false}
          />
        </div>
      </div>
      {
        accountDetailsLoading ? (
          <Loading />
        ) : (
          <div className="flex justify-center max-h-[35vh]">
            <Bar 
              className='max-w-2xl'
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
                datasets: [
                  {
                  label: 'cash',
                  data: formatData('cash'),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)'
                },
                {
                  label: 'expense',
                  data: formatData('expense'),
                  backgroundColor: 'rgba(99, 255, 132, 0.5)'
                }
              ]
              }} 
            />
          </div>
        )
      }
    </div>
  )
}

export default AccountPanel