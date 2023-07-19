import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { describe, expect, it, vi }  from 'vitest'

import { setupStore, StoreType } from '../../main'
import { addAccountExpense, deleteAccountExpense, editAccountExpense, getAccountExpenses } from './AccountDetailsExpensesSlice'

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));

describe('accountDetailsExpensesSlice > default state', () => {
  it('Should initially set income to empty Array', () => {
    const state = setupStore().getState().accountDetailsExpenses
    expect(state.expenses).toEqual([])
  })

  it('Should initially set income loading status to false', () => {
    const state = setupStore().getState().accountDetailsExpenses
    expect(state.isLoading).toBeFalsy()
  })
})

describe('accountDetailsExpensesSlice > addAccountExpense', () => {
  let mock: any;
  let testStore: StoreType;

  const mockAddAccountDetailsExpenses = {
    title: 'Test',
    amount: "123",
    date: new Date("2023-05-29T11:04:20.338Z"),
  }

  const mockAddAccountDetailsExpensesResponse = {
    title: 'Test',
    amount: "123",
    date: "2023-05-29T11:04:20.338Z",
  }
  
  beforeEach(() => {
    testStore = setupStore()
  })

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Add Account Expenses to store', async () => {
    mock.onPost('http://localhost:8080/account-expense/v1/add-expense?account_id=1').reply(200, mockAddAccountDetailsExpenses);

    await testStore.dispatch(addAccountExpense({ account_id: 1, data: mockAddAccountDetailsExpenses }))

    expect(testStore.getState().accountDetailsExpenses.expenses[0]).toMatchObject(mockAddAccountDetailsExpensesResponse)
  })

  it('Do not add Account Expenses to store', async () => {
    mock.onPost('http://localhost:8080/account-expense/v1/add-expense?account_id=1').networkErrorOnce();

    await testStore.dispatch(addAccountExpense({ account_id: 1, data: mockAddAccountDetailsExpenses }))

    expect(testStore.getState().accountDetailsExpenses.expenses).toMatchObject([])
  })
})

describe('accountDetailsExpensesSlice > getAccountExpenses', () => {
  let mock: any;
  let testStore: StoreType;

  const mockGetAccountExpenses = [
    {
      title: 'Test',
      currency: "USD",
      amount: "123",
      date: "2023-05-29T11:04:20.338Z",
    },
    {
      title: 'Test123',
      currency: "PLN",
      amount: "1233",
      date: "2023-06-29T11:04:20.338Z",
    },
  ]
  
  beforeEach(() => {
    testStore = setupStore()
  })

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Get Expenses from Store', async () => {
    mock.onGet('http://localhost:8080/account-expense/v1/get-expenses?account_id=1').reply(200, mockGetAccountExpenses)

    await testStore.dispatch(getAccountExpenses(1))

    expect(testStore.getState().accountDetailsExpenses.expenses).toEqual(mockGetAccountExpenses)
  })

  it('Do not get Expenses from Store', async () => {
    mock.onGet('http://localhost:8080/account-expense/v1/get-expenses?account_id=1').networkErrorOnce()

    await testStore.dispatch(getAccountExpenses(1))

    expect(testStore.getState().accountDetailsExpenses.expenses).toEqual([])
  })
})

describe('accountDetailsExpensesSlice > editAccountExpense', () => {
  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Get edited Account Expenses from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: "123",
      date: new Date("2023-05-29T11:04:20.334Z"),
    }
    
    const testStore = setupStore({
      accountDetailsExpenses: {
        expenses: [storeValue],
        isLoading: false
      },
    })

    const mockEditAccountExpense = {
      id: 123,
      title: 'Test1111',
      amount: "123",
      date: new Date("2023-05-29T11:04:20.338Z"),
    }

    const mockEditAccountExpenseResponse = {
      id: 123,
      title: 'Test1111',
      amount: "123",
      date: "2023-05-29T11:04:20.338Z",
    }

    mock.onPut(`http://localhost:8080/account-expense/v1/edit-expense?expense_id=123`).reply(200, mockEditAccountExpenseResponse);

    expect(testStore.getState().accountDetailsExpenses.expenses[0]).toMatchObject(storeValue)

    await testStore.dispatch(editAccountExpense(mockEditAccountExpense))

    expect(testStore.getState().accountDetailsExpenses.expenses[0]).toMatchObject(mockEditAccountExpenseResponse)
  })

  it('Do not Get Edited Account Expenses from Store', async () => {
    //given
    const testStore = setupStore()
    mock.onPut('http://localhost:8080/account-expense/v1/edit-expense?expense_id=1').networkErrorOnce();
    const mockAddIncome = {
      title: 'Test',
      currency: "USD",
      amount: "123",
      date: new Date("2023-05-29T11:04:20.338Z"),
    }

    //then
    await testStore.dispatch(editAccountExpense(mockAddIncome))

    //expect
    expect(testStore.getState().income.income).toMatchObject([]);
  })
})

describe('accountDetailsExpensesSlice > deleteAccountExpense', () => {
  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Should not delete AccountExpense from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: "123",
      date: new Date("2023-05-29T11:04:20.334Z"),
    }
    
    const testStore = setupStore({
      accountDetailsExpenses: {
        expenses: [storeValue],
        isLoading: false
      }
    })

    mock.onDelete('http://localhost:8080/account-expense/v1/delete-expense?expense_id=123').networkErrorOnce();

    expect(testStore.getState().accountDetailsExpenses.expenses[0]).toMatchObject(storeValue)

    await testStore.dispatch(deleteAccountExpense(123))

    expect(testStore.getState().accountDetailsExpenses.expenses[0]).toMatchObject(storeValue)
  })

  it('Should delete AccountExpense from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: "123",
      date: new Date("2023-05-29T11:04:20.334Z"),
    }

    const testStore = setupStore({
      accountDetailsExpenses: {
        expenses: [storeValue],
        isLoading: false
      }
    })

    mock.onDelete('http://localhost:8080/account-expense/v1/delete-expense?expense_id=123').reply(200, storeValue);

    expect(testStore.getState().accountDetailsExpenses.expenses[0]).toMatchObject(storeValue)

    await testStore.dispatch(deleteAccountExpense(123))

    expect(testStore.getState().accountDetailsExpenses.expenses).toEqual([])
  })
})