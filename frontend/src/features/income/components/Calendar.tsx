import { forwardRef } from 'react'

import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick }: any, ref: any ) => (
  <button className="text-gray-600 hover:text-black" onClick={onClick} ref={ref}>
    {value}
  </button>
));

interface ICalendar {
  startDate: Date,
  setStartDate: (date: Date) => void
}

const Calendar: React.FC<ICalendar> = ({ setStartDate, startDate}) => {
  
  const handleIncreaseYear = () => {
    const nextYear = startDate.getFullYear() + 1

    setStartDate(new Date(startDate.setFullYear(nextYear)))
  }

  const handleDecreaseYear = () => {
    const previoiusYear = startDate.getFullYear() - 1 

    setStartDate(new Date(startDate.setFullYear(previoiusYear)))
  }

  return (
    <div className='flex items-center'>
      <div className='flex mx-2'>
        <DatePicker 
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
          customInput={<CustomInput />}
        />
      </div>
      <div className='flex'>
        <MdArrowBackIos className='text-gray-600 cursor-pointer hover:text-black' onClick={handleDecreaseYear}/>
        <MdArrowForwardIos className='text-gray-600 cursor-pointer hover:text-black' onClick={handleIncreaseYear}/>
      </div>
    </div>
  )
}

export default Calendar