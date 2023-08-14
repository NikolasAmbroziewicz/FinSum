import { useSelector } from 'react-redux'

import {
  getAllAccounts, 
  getLoadingStatus
} from 'src/store/CryptoAccount/CryptoAccountSlice'

import H2 from 'src/shared/components/Headers/H2'
import NotFound from 'src/shared/components/NotFound/NotFound'
import Loading from 'src/shared/components/Loading/Loading'

import CryptoAccountListElement from './CryptoAccountListElement'

import { Position } from 'src/shared/components/Headers/Header.types';
import { LoadingPosition } from 'src/shared/components/Loading/types';

import { useScreen } from 'src/shared/hooks/useScreen'

const CryptoCurrencyList = () => {
  const accounts = useSelector(getAllAccounts)
  const loading = useSelector(getLoadingStatus)

  const { isMobileScreen } = useScreen()

  return (
    <div className="flex flex-col h-full gap-6 mt-4">
      <H2 position={Position.left}>Your Accounts</H2>
      <div
        className={`flex flex-row flex-wrap ${
          isMobileScreen() || (accounts.length === 0 && 'justify-center')
        }  gap-6 cursor-pointer`}
      >
        {loading ? (
          <Loading position={LoadingPosition.start} />
        ) : accounts.length !== 0 ? (
          accounts.map((account) => (
            <CryptoAccountListElement key={account.id} account={account} />
          ))
        ) : (
          <NotFound text={'No Accounts Found'} />
        )}
      </div>
    </div>
  )
}

export default CryptoCurrencyList