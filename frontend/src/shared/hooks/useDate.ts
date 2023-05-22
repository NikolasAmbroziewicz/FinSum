import moment from 'moment'

export const useDate = () => {
  const dateFormat = (date: Date) => {
    return moment(date).format('ll')
  }

  return {
    dateFormat
  }
}
