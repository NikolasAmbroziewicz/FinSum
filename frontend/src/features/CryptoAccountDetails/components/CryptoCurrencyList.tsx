import { useSelector } from 'react-redux';

import {
  getAllCryptoCurrency,
  getLoadingStatus
} from 'src/store/CryptoAccountDetails/CryptoAccountDetailsSlice'

import H3 from 'src/shared/components/Headers/H3';

import NotFound from 'src/shared/components/NotFound/NotFound';
import BaseTable from 'src/shared/components/Table/BaseTable';
import Loading from 'src/shared/components/Loading/Loading';

import CryptoCurrencyListElement from './CryptoCurrencyListElement';
import CryptoCurrencyListAction from './CryptoCurrencyListAction';

import { useScreen } from 'src/shared/hooks/useScreen';

import { Position } from 'src/shared/components/Headers/Header.types'
import { LoadingPosition } from 'src/shared/components/Loading/types';

interface ICryptoCurrencyList {
  accountId: number
}

const CryptoCurrencyList: React.FC<ICryptoCurrencyList> = ({
  accountId
}) => {
  const cryptoCurrency = useSelector(getAllCryptoCurrency);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen();
  
  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        <H3 position={Position.left}>
          Wallet History
        </H3>
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) : cryptoCurrency.length !== 0 ? (
            isMobileScreen() ? (
              <div>
                Mobile Screen
              </div>
            ) : (
              <BaseTable
                headers={['Coin Name', 'Ticker', 'Amount', 'Price Bought', 'Price Sold', 'Date Bought', 'Date Sold', 'Stock Name', '']}
                headerWidth={['1/2', '80px', '80px', '140px', '120px', '140px', '140px', '140px', '60px']}
              >
                {
                  cryptoCurrency.map((item) => (
                    <CryptoCurrencyListElement
                      key={item.id}
                      item={item}
                    >
                      <CryptoCurrencyListAction 
                        cryptoCurrency={item}
                        accountId={accountId}
                      />
                    </CryptoCurrencyListElement>
                  ))
                }

              </BaseTable>
            )
          ) : (
            <NotFound text={'No Crypto Currency History Found'} />
          )
        }
      </div>
    </div>
  )
}

export default CryptoCurrencyList