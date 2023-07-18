import { useDate } from 'src/shared/hooks/useDate';
import { useScreen } from 'src/shared/hooks/useScreen';

interface IListElement {
  amount: string;
  currency?: string;
  date: Date;
  title: string;
  children: JSX.Element;
}

const ListElement: React.FC<IListElement> = ({
  amount,
  children,
  currency,
  date,
  title
}) => {
  const { isTabletScreen } = useScreen();
  const { dateFormat } = useDate();

  const tableHeaderStyles = () => {
    return isTabletScreen() ? 'px-2 py-1' : 'px-4 py-2';
  };

  return (
    <tr className="border-b-2 border-gray-100">
      <td className={`${tableHeaderStyles()} text-gray-600`}>{title}</td>
      <td className={`${tableHeaderStyles()} text-gray-600`}>{amount}</td>
      {
        currency && (
          <td className={`${tableHeaderStyles()} text-gray-600`}>{currency}</td>
        )
      }
      <td className={`${tableHeaderStyles()} text-gray-600`}>
        {dateFormat(date)}
      </td>
      <td className={`${tableHeaderStyles()}`}>{children}</td>
    </tr>
  );
};

export default ListElement;
