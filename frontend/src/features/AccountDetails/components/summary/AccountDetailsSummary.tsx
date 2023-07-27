import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { AppDispatch } from 'src/store/main';
import { getAccountSummary, getAccountSummaryDetails } from 'src/store/AccountsDetails/summary/AccountDetailsSummarySlice'

import H1 from 'src/shared/components/Headers/H1';
import H2 from 'src/shared/components/Headers/H2';
import Calendar from "src/shared/components/Calendar/Calendar";

import { useDate } from 'src/shared/hooks/useDate';
import { useScreen } from 'src/shared/hooks/useScreen';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IAccountDetailsSummary {
  setStartDate: (date: Date) => void
  startDate: Date
}

const AccountDetailsSummary: React.FC<IAccountDetailsSummary> = ({ setStartDate, startDate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const summary = useSelector(getAccountSummaryDetails)
  const params = useParams();

  const { dateMonthYear } = useDate()
  const { isMobileScreen } = useScreen()

  useEffect(() => {
    dispatch(getAccountSummary({
      date: startDate,
      account_id:  Number(params['accountId'])
    }))
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  const data = {
    datasets: [
      {
        data: [summary.total_income, summary.total_expense],
        backgroundColor: [
          '#bef264',
          '#fca5a5',
        ],
        borderColor: [
          '#3f6212)',
          '#991b1b',
        ],
        borderWidth: 1,
      },
    ],
  };

  const mobileScreen = () => {
    return isMobileScreen() ? 'flex-col items-center' : 'flex-row'
  }

  return (
    <div>
      <div>
        <H1>Account Summart for {dateMonthYear(startDate)}</H1>
        <div className='flex justify-end my-4'>
          <span>Date:</span>
          <Calendar yearCalendar={false} setStartDate={setStartDate} startDate={startDate} />
        </div>
      </div>
      <div className={`flex ${mobileScreen()} max-w-[600px] m-auto`}>
        <div className='max-w-[300px]'>
          <Doughnut data={data} />
        </div>
        <div className='flex flex-col max-w-[300px] mx-auto py-2'>
          <span className='text-lime-600 text-xl'>
            Total Incomes: {summary.total_income} {summary.account.currency}
          </span>
          <span className='text-red-600 text-xl'>
            Total Expense: {summary.total_expense} {summary.account.currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsSummary;
