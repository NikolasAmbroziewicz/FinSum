import { forwardRef } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button
    className={`w-full shadow border border-slate-300 rounded py-2 px-3 text-gray-700 leading-tight text-start`}
    type="button"
    onClick={onClick}
    ref={ref}
  >
    {value === '' ? 'Date' : value}
  </button>
));

interface IIncomeFormCalendar {
  date: Date | undefined | null;
  setDate: (date: Date) => void;
}

const IncomeFormCalendar: React.FC<IIncomeFormCalendar> = ({
  date,
  setDate
}) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date: Date) => setDate(date)}
      customInput={<CustomInput />}
      dateFormat="MM/dd/yyyy"
    />
  );
};

export default IncomeFormCalendar;
