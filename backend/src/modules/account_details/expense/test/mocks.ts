const mockDate = new Date('2020-12-12')

export const mockExpense = {
  id: 6,
  amount: "8021",
  title: "Work",
  description: "Work bla bla",
  date: mockDate,
  account_id: 13
}

export const mockExpenseInput = {
  amount: "8021",
  title: "Work",
  description: "Work bla bla",
  date: mockDate
}

export const userWithToken = {
  userId: 1,
  email: 'niko@test.com',
  iat: 12,
  exp: 12,
  refreshToken: '',
  accessToken: '',
};
