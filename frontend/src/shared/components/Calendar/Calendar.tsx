import CalendarInput from './CalenderInput';
import DatePicker from 'react-datepicker';

import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

interface ICalendar {
  startDate: Date;
  setStartDate: (date: Date) => void;
  yearCalendar?: boolean,
}

const Calendar: React.FC<ICalendar> = ({ 
  setStartDate, 
  startDate, 
  yearCalendar = true,
}) => {
  const handleIncreaseYear = () => {
    const nextYear = startDate.getFullYear() + 1;

    setStartDate(new Date(startDate.setFullYear(nextYear)));
  };

  const handleDecreaseYear = () => {
    const previoiusYear = startDate.getFullYear() - 1;

    setStartDate(new Date(startDate.setFullYear(previoiusYear)));
  };

  const handleIncreaseMonth = () => {
    const nextMonth = startDate.getMonth() + 1;

    setStartDate(new Date(startDate.setMonth(nextMonth)))
  }

  const handleDecreaseMonth = () => {
    const previousMonth = startDate.getMonth() - 1;

    setStartDate(new Date(startDate.setMonth(previousMonth)))
  }

  return (
    <div className="flex items-center">
      <div className="flex mx-2">
        {
          yearCalendar ? (
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              showYearPicker={yearCalendar}
              dateFormat="yyyy"
              customInput={<CalendarInput />}
            />
          ) : (
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              showYearPicker={yearCalendar}
              dateFormat="MM/yyyy"
              customInput={<CalendarInput />}
              showMonthYearPicker
              showFullMonthYearPicker
              showFourColumnMonthYearPicker
            />
          )
        }
      </div>
      <div className="flex">
        <button onClick={yearCalendar ? handleDecreaseYear : handleDecreaseMonth} data-test="iconBack">
          <MdArrowBackIos className="text-gray-600 cursor-pointer hover:text-black" />
        </button>
        <button onClick={yearCalendar ? handleIncreaseYear : handleIncreaseMonth} data-test="iconForward">
          <MdArrowForwardIos className="text-gray-600 cursor-pointer hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default Calendar;
