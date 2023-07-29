import { forwardRef } from 'react';

const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button
    className="text-gray-600 hover:text-black"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));

export default CalendarInput;
