import { describe, expect, it, vi } from 'vitest';

import { setupStore, StoreType } from '../../main';
import {
  addAccountExpense,
  deleteAccountExpense,
  editAccountExpense,
  getAccountExpenses
} from './AccountDetailsExpensesSlice';

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));

// mocks
const addAccountExpenseMock = vi.fn()
const editAccountExpenseMock = vi.fn()
const deleteAccountExpenseMock = vi.fn()
const getAccountExpensesMock = vi.fn()

vi.mock('src/features/AccountDetails/api/AccountDetailsExpenses', () => ({
  useDetailsExpenses: () => ({
    add_account_expense: addAccountExpenseMock,
    delete_account_expense: deleteAccountExpenseMock,
    edit_account_expense: editAccountExpenseMock,
    get_account_expenses: getAccountExpensesMock,
  })
}))

describe('accountDetailsExpensesSlice > default state', () => {
  it('Should initially set income to empty Array', () => {
    const state = setupStore().getState().accountDetailsExpenses;
    expect(state.expenses).toEqual([]);
  });

  it('Should initially set income loading status to false', () => {
    const state = setupStore().getState().accountDetailsExpenses;
    expect(state.isLoading).toBeFalsy();
  });
});

describe('accountDetailsExpensesSlice > addAccountExpense', () => {
  let testStore: StoreType;

  const mockAddAccountDetailsExpenses = {
    title: 'Test',
    amount: '123',
    date: new Date('2023-05-29T11:04:20.338Z')
  };

  const mockAddAccountDetailsExpensesResponse = {
    title: 'Test',
    amount: '123',
    date: '2023-05-29T11:04:20.338Z'
  };

  beforeEach(() => {
    testStore = setupStore();
  });

  it('Add Account Expenses to store', async () => {
    addAccountExpenseMock.mockResolvedValueOnce(mockAddAccountDetailsExpensesResponse)

    await testStore.dispatch(
      addAccountExpense({ account_id: 1, data: mockAddAccountDetailsExpenses })
    );

    expect(
      testStore.getState().accountDetailsExpenses.expenses[0]
    ).toMatchObject(mockAddAccountDetailsExpensesResponse);
  });

  it('Do not add Account Expenses to store', async () => {
    addAccountExpenseMock.mockRejectedValueOnce({})


    await testStore.dispatch(
      addAccountExpense({ account_id: 1, data: mockAddAccountDetailsExpenses })
    );

    expect(testStore.getState().accountDetailsExpenses.expenses).toMatchObject(
      []
    );
  });
});

describe('accountDetailsExpensesSlice > getAccountExpenses', () => {
  const mockDate = new Date('2023-04-19');
  let testStore: StoreType;

  const mockGetAccountExpenses = [
    {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: '2023-05-29T11:04:20.338Z'
    },
    {
      title: 'Test123',
      currency: 'PLN',
      amount: '1233',
      date: '2023-06-29T11:04:20.338Z'
    }
  ];

  beforeEach(() => {
    testStore = setupStore();
  });

  it('Get Expenses from Store', async () => {
    getAccountExpensesMock.mockResolvedValueOnce(mockGetAccountExpenses)

    await testStore.dispatch(
      getAccountExpenses({ account_id: 1, date: mockDate })
    );

    expect(testStore.getState().accountDetailsExpenses.expenses).toEqual(
      mockGetAccountExpenses
    );
  });

  it('Do not get Expenses from Store', async () => {
    getAccountExpensesMock.mockRejectedValueOnce(mockGetAccountExpenses)

    await testStore.dispatch(
      getAccountExpenses({ account_id: 1, date: mockDate })
    );

    expect(testStore.getState().accountDetailsExpenses.expenses).toEqual([]);
  });
});

describe('accountDetailsExpensesSlice > editAccountExpense', () => {
  it('Get edited Account Expenses from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      accountDetailsExpenses: {
        expenses: [storeValue],
        isLoading: false
      }
    });

    const mockEditAccountExpense = {
      id: 123,
      title: 'Test1111',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    const mockEditAccountExpenseResponse = {
      id: 123,
      title: 'Test1111',
      amount: '123',
      date: '2023-05-29T11:04:20.338Z'
    };

    editAccountExpenseMock.mockResolvedValue(mockEditAccountExpenseResponse)

    expect(
      testStore.getState().accountDetailsExpenses.expenses[0]
    ).toMatchObject(storeValue);

    await testStore.dispatch(editAccountExpense(mockEditAccountExpense));

    expect(
      testStore.getState().accountDetailsExpenses.expenses[0]
    ).toMatchObject(mockEditAccountExpenseResponse);
  });

  it('Do not Get Edited Account Expenses from Store', async () => {
    //given
    const testStore = setupStore();
    editAccountExpenseMock.mockRejectedValueOnce({})

    const mockAddIncome = {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    //then
    await testStore.dispatch(editAccountExpense(mockAddIncome));

    //expect
    expect(testStore.getState().income.income).toMatchObject([]);
  });
});

describe('accountDetailsExpensesSlice > deleteAccountExpense', () => {
  it('Should not delete AccountExpense from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      accountDetailsExpenses: {
        expenses: [storeValue],
        isLoading: false
      }
    });

    deleteAccountExpenseMock.mockRejectedValueOnce({})

    expect(
      testStore.getState().accountDetailsExpenses.expenses[0]
    ).toMatchObject(storeValue);

    await testStore.dispatch(deleteAccountExpense(123));

    expect(
      testStore.getState().accountDetailsExpenses.expenses[0]
    ).toMatchObject(storeValue);
  });

  it('Should delete AccountExpense from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      accountDetailsExpenses: {
        expenses: [storeValue],
        isLoading: false
      }
    });

    deleteAccountExpenseMock.mockResolvedValueOnce(storeValue)

    expect(
      testStore.getState().accountDetailsExpenses.expenses[0]
    ).toMatchObject(storeValue);

    await testStore.dispatch(deleteAccountExpense(123));

    expect(testStore.getState().accountDetailsExpenses.expenses).toEqual([]);
  });
});
