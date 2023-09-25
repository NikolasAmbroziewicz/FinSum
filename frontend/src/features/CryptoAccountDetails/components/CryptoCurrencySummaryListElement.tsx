import { useScreen } from 'src/shared/hooks/useScreen';

import { CryptoCurrencySummary } from 'src/features/CryptoAccountDetails/validators'

interface ICryptoCurrencySummaryListElement {
  item: CryptoCurrencySummary
  children: JSX.Element
}

const CryptoCurrencySummaryListElement: React.FC<ICryptoCurrencySummaryListElement> = ({
  item,
  children
}) => {
  const { coinName, avgPrice, amount, currentPrice, procent } = item
  const { isTabletScreen } = useScreen();

  const tableHeaderStyles = () => {
    return isTabletScreen() ? 'px-2 py-1' : 'px-4 py-2';
  };

  return (
    <tr className="border-b-2 border-gray-100">
      <td className={`${tableHeaderStyles()} text-gray-600`}>{coinName}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{avgPrice}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{amount}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{currentPrice}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{procent}</td>
      <td className={`${tableHeaderStyles()}`}>{children}</td>
    </tr>
  )
}

export default CryptoCurrencySummaryListElement