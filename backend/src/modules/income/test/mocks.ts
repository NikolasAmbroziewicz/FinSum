export const mockDate = new Date('2020-12-12')

export const userWithToken = {
  userId: 1,
  email: 'niko@test.com',
  iat: 12,
  exp: 12,
  refreshToken: '',
  accessToken: '',
};

export const addedIncomeInput = {
  amount: '8021.12',
  currency: 'USD',
  title: 'Work',
  date: mockDate,
};

export const editIncomeInput = {
  amount: '7000',
  currency: 'PLN',
  title: 'University',
  date: mockDate
};

export const addedIncome = {
  id: 12,
  name: 'Work',
  amount: 8021.12,
  currency: 'USD',
  date: '2023-04-20T08:55:45.441Z',
  user_id: 4,
};

export const editIncome = {
  id: 11,
  name: 'University',
  amount: 7000,
  currency: 'PLN',
  date: '2023-04-20T08:55:45.441Z',
  user_id: 3,
};
