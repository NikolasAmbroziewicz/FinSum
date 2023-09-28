import H3 from 'src/shared/components/Headers/H3';
import H4 from 'src/shared/components/Headers/H4';

import { Position } from 'src/shared/components/Headers/Header.types';
import { CryptoCurrencySummary } from 'src/features/CryptoAccountDetails/validators'

interface ICryptoCurrencySummaryListElementMobile {
  item: CryptoCurrencySummary
}

const CryptoCurrencySummaryListElementMobile: React.FC<ICryptoCurrencySummaryListElementMobile> = ({
  item
}) => {
  const { coinName, avgPrice, amount, currentPrice, procent } = item

  const procentColor = () => {
    return procent.startsWith('-') ? 'text-red-600' : 'text-green-600'
  }

  return (
    <div className="bg-gray-100 p-2 rounded relative">
      <div className="flex justify-between items-center">
        <H3 position={Position.left}>{coinName}</H3>
      </div>
      <div className="flex justify-between items-center my-1">
        <H4 position={Position.left}>AvgPrice: {avgPrice}</H4>
        <H4 position={Position.right}>Amount: {amount}</H4>
      </div>
      <div className="flex justify-between items-center my-1">
        <H4 position={Position.right}>Current Price: {currentPrice}</H4>
        <H4 styles={procentColor()} position={Position.right}>Procent: {procent}</H4>
      </div>
    </div>
  )
}

export default CryptoCurrencySummaryListElementMobile