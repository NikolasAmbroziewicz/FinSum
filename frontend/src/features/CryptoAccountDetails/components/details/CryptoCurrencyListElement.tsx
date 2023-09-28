import { useDate } from 'src/shared/hooks/useDate';
import { useScreen } from 'src/shared/hooks/useScreen';

import { CryptoCurrencyDetailsSchemaType } from 'src/features/CryptoAccountDetails/validators'

interface ICryptoCurrencyListElement {
  item: CryptoCurrencyDetailsSchemaType,
  children: JSX.Element
}

const CryptoCurrencyListElement: React.FC<ICryptoCurrencyListElement> = ({
  item,
  children
}) => {
  const { name, amount, ticker, price_bought, price_sold, date_bought, date_sold, stock_name } = item
  const { isTabletScreen } = useScreen();
  const { dateFormat } = useDate();

  const tableHeaderStyles = () => {
    return isTabletScreen() ? 'px-2 py-1' : 'px-4 py-2';
  };

  return (
    <tr className="border-b-2 border-gray-100">
      <td className={`${tableHeaderStyles()} text-gray-600`}>{name}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{ticker}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{amount}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{price_bought}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>
        {
          price_sold ? (
            price_sold
          ) : (
            ''
          )
        }
      </td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{dateFormat(date_bought)}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>
        {
          date_sold ? (
            dateFormat(date_sold)
          ) : (
            ''
          )
        }
      </td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>
        {
          stock_name ? (
            stock_name
          ) : (
            ''
          )
        }
      </td>
      <td className={`${tableHeaderStyles()}`}>{children}</td>
    </tr>
  )
}

export default CryptoCurrencyListElement