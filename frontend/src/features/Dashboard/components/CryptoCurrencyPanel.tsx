import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch } from 'src/store/main';

import { getCryptoAccounts, getAllAccounts } from 'src/store/CryptoAccount/CryptoAccountSlice'
import { getCryptoCurrencySummary, getLoadingStatus, getAllSummaryCryptoCurrency } from 'src/store/CryptoAccountDetails/summary/CryptoAccountDetailsSummarySlice'

import H4 from "src/shared/components/Headers/H4"

import Loading from "src/shared/components/Loading/Loading";
import ButtonDropdownMenu from 'src/shared/components/Dropdown/ButtonDropdownMenu';
import NotFound from 'src/shared/components/NotFound/NotFound';

import { Position } from 'src/shared/components/Headers/Header.types'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DropdownContent } from 'src/shared/components/Dropdown/types';

const COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(99, 255, 132, 0.2)',
  'rgba(99, 123, 100, 0.2)',
  'rgba(51, 111, 165, 0.2)',
  'rgba(60, 100, 132, 0.2)',
  'rgba(12, 112, 255, 0.2)',
  'rgba(100, 255, 64, 0.2)',
]

const BORDER_COLOR = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(99, 255, 132, 1)',
  'rgba(99, 123, 100, 1)',
  'rgba(51, 111, 165, 1)',
  'rgba(60, 100, 132, 1)',
  'rgba(12, 112, 255, 1)',
  'rgba(100, 255, 64, 1)'
]

ChartJS.register(ArcElement, Tooltip, Legend);

const CryptoCurrencyPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [activeAccount, setActiveAccount] = useState<DropdownContent | null>(null)

  const allAccounts = useSelector(getAllAccounts)
  const accountDetails = useSelector(getAllSummaryCryptoCurrency)
  const accountDetailsLoading = useSelector(getLoadingStatus)

  const fetchData = async () => {
    const accounts = await dispatch(getCryptoAccounts()).unwrap()

    handleAccountChange({
      id: accounts[0].id as number, 
      content: accounts[0].title
    })

    await handleGetAccountDetails(accounts[0].id as number)
  } 

  const handleGetAccountDetails = async (id: number) => {
    await dispatch(getCryptoCurrencySummary(id))
  }

  const handleAccountChange = (val: DropdownContent) => {
    if(activeAccount?.id !== val.id) {
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
    if (activeAccount !== null) {
      handleGetAccountDetails(activeAccount.id as number)
    }
  }, [activeAccount])

  const formatData = () => {
    console.log(accountDetails)

    return {
      labels: accountDetails.map((coin) => coin.coinName),
      datasets: [{
        label: '',
        data: accountDetails.map((coin) => coin.value),
        backgroundColor: accountDetails.map((_, index) => COLORS[index]),
        borderColor: accountDetails.map((_, index) => BORDER_COLOR[index])
      }]
    }
  }

  return (
    <div className="flex flex-col border-1 border-solid border border-slate-300 p-2">
      <div className="flex justify-between align-top p-2">
        <H4 styles="p-2" position={Position.left}>CryptoCurrencyPanel</H4>
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
      {
        accountDetailsLoading ? (
          <Loading />
        ) : (
          <div className='flex w-[100%] m-auto justify-center'>
            {
              accountDetails.length !== 0 ? (
                <div className='max-w-[50%]'>
                  <Doughnut data={formatData()}/>
                </div>
              ) : (
                <div>
                  <NotFound text="No Data Found for this Wallet" />
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default CryptoCurrencyPanel