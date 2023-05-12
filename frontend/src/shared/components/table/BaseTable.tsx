interface IBaseTable {
  headers: string[],
  children: JSX.Element
}

const BaseTable: React.FC<IBaseTable> = ({ headers, children }) => {
  return (
    <table className="w-full border-2 border-gray-100 rounded-lg overflow-hidden">
      <thead>
        <tr>
          {
            headers.map((header) => <th className="bg-gray-100 text-gray-600 text-left px-4 py-2">{header}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default BaseTable