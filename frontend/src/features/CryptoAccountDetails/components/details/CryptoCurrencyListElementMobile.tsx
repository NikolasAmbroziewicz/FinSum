import H3 from 'src/shared/components/Headers/H3';
import H4 from 'src/shared/components/Headers/H4';

import { useDate } from 'src/shared/hooks/useDate';

import { Position } from 'src/shared/components/Headers/Header.types';
import { CryptoCurrencyDetailsSchemaType } from 'src/features/CryptoAccountDetails/validators'

interface ICryptoCurrencyListElement {
  item: CryptoCurrencyDetailsSchemaType,
  children: JSX.Element
}

const CryptoCurrencyListElementMobile: React.FC<ICryptoCurrencyListElement> = ({
  item,
  children
}) => {
  const { name, amount, ticker, price_bought, price_sold, date_bought, date_sold, stock_name } = item
  const { dateFormat } = useDate();

  return (
    <div className="bg-gray-100 p-2 rounded relative">
      <div className="flex justify-between items-center">
        <H3 position={Position.left}>{name}</H3>
        <div>{children}</div>
      </div>
      <div className="flex justify-between items-center my-1">
        <H4 position={Position.left}>Amount: {amount}</H4>
      </div>
      <div className="flex justify-between items-center my-1">
        <H4 position={Position.left}>Price Bought: {price_bought}</H4>
        <H4 position={Position.right}>Date: {dateFormat(date_bought)}</H4>
      </div>
      {
        price_sold || price_sold && (
          <div className="flex justify-between items-center my-1">
            {
              price_sold && (
                <H4 position={Position.left}>Price Sold: {price_sold}</H4>
              )
            }
            {
              date_sold && (
                <H4 position={Position.right}>Date: {dateFormat(date_sold)}</H4>
              )
            }        
          </div>   
        )
      }
      {
        stock_name && (
          <div className="flex justify-between items-center my-1">
            <H4 position={Position.left}>Stock Name: {stock_name}</H4>
          </div>
        )
      }
    </div>
  )
}

export default CryptoCurrencyListElementMobile