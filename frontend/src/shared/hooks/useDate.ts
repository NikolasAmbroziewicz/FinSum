import moment from 'moment';

export const useDate = () => {
  const dateFormat = (date: Date) => {
    return moment(date).format('ll');
  };

  const dateMonthYear = (date: Date) => {
    return moment(date).format('MMMM YYYY');
  };

  return {
    dateFormat,
    dateMonthYear
  };
};
