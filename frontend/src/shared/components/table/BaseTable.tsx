import { useScreen } from 'src/shared/hooks/useScreen';
interface IBaseTable {
  headers: string[];
  children: JSX.Element[] | JSX.Element;
  headerWidth: string[];
}

const BaseTable: React.FC<IBaseTable> = ({
  headers,
  headerWidth,
  children
}) => {
  const { isTabletScreen } = useScreen();

  const tableHeaderStyles = () => {
    return isTabletScreen() ? 'px-2 py-1' : 'px-4 py-2';
  };

  return (
    <table className="w-full relative">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={`bg-gray-100 text-gray-600 text-left ${tableHeaderStyles()}`}
              style={{ width: headerWidth[index] }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default BaseTable;
