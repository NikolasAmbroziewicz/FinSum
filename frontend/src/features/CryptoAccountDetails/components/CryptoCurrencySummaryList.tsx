import { useSelector } from 'react-redux';

import {
  getAllSummaryCryptoCurrency,
  getLoadingStatus
} from 'src/store/CryptoAccountDetails/summary/CryptoAccountDetailsSummarySlice'

import H3 from 'src/shared/components/Headers/H3';
import CryptoCurrencySummaryListElement from './CryptoCurrencySummaryListElement';

import NotFound from 'src/shared/components/NotFound/NotFound';
import BaseTable from 'src/shared/components/Table/BaseTable';
import Loading from 'src/shared/components/Loading/Loading';

import { useScreen } from 'src/shared/hooks/useScreen';

import { Position } from 'src/shared/components/Headers/Header.types'
import { LoadingPosition } from 'src/shared/components/Loading/types';

const CryptoCurrencySummaryList = () => {
  const cryptoCurrency = useSelector(getAllSummaryCryptoCurrency);
  const loading = useSelector(getLoadingStatus)

  const { isMobileScreen } = useScreen();

  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        <H3 position={Position.left}>
          Crypto Currency Summary
        </H3>
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) :  cryptoCurrency.length !== 0 ? (
            isMobileScreen() ? (
              <div>
                Mobile Screen
              </div>
            ) : (
              <BaseTable
                headers={['Coin Name', 'Avg Price', 'Amount', 'Current Price', 'Gain/Lost', '']}
                headerWidth={['1/2', '150px', '130px', '150px', '60px', '60px', '60px']}
              >
                <CryptoCurrencySummaryListElement
                  item={{
                    coinName: 'Bitcoin',
                    avgPrice: '123',
                    amount: '123',
                    currentPrice: '12451',
                    procent: '12%'
                  }}
                >
                  <div>
      
                  </div>
                </CryptoCurrencySummaryListElement>
              </BaseTable>
            )
          ) : (
            <NotFound text={'No Crypto Currency Summary Found'} />
          )
        }
      </div>
    </div>
  )
}

export default CryptoCurrencySummaryList