import { useDate } from 'src/shared/hooks/useDate'

interface IIncomeListElement {
  amount: string,
  currency: string,
  date: Date,
  title: string,
  children: JSX.Element
}

const IncomeListElement: React.FC<IIncomeListElement> = ({ amount, children, currency, date, title }) => {
  const  { dateFormat } = useDate()

  return (
    <tr className='border-2 border-gray-100'>
      <td className="px-4 py-2 text-gray-600">{title}</td>
      <td className="px-4 py-2 text-gray-600">{amount}</td>
      <td className="px-4 py-2 text-gray-600">{currency}</td>
      <td className="px-4 py-2 text-gray-600">{dateFormat(date)}</td>
      <td className="px-4 py-2">{children}</td>
    </tr>
  )
}

export default IncomeListElement