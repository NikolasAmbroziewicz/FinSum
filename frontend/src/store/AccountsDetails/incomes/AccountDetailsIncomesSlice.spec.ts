import { describe, expect, it, vi } from 'vitest';

import { setupStore, StoreType } from '../../main';
import {
  addAccountIncome,
  deleteAccountIncome,
  editAccountIncome,
  getAccountIncomes
} from './AccountDetailsIncomesSlice';

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));

// mocks
const addAccountIncomeMock = vi.fn();
const editAccountIncomeMock = vi.fn();
const deleteAccountIncomeMock = vi.fn();
const getAccountIncomesMock = vi.fn();

vi.mock('src/features/AccountDetails/api/AccountDetailsIncomes', () => ({
  useDetailsIncomes: () => ({
    add_account_income: addAccountIncomeMock,
    delete_account_income: deleteAccountIncomeMock,
    edit_account_income: editAccountIncomeMock,
    get_account_incomes: getAccountIncomesMock
  })
}));

describe('accountDetailsIncomesSlice > default state', () => {
  it('Should initially set income to empty Array', () => {
    const state = setupStore().getState().accountDetailsIncomes;
    expect(state.incomes).toEqual([]);
  });

  it('Should initially set income loading status to false', () => {
    const state = setupStore().getState().accountDetailsIncomes;
    expect(state.isLoading).toBeFalsy();
  });
});

describe('accountDetailsIncomesSlice > addAccountIncome', () => {
  let testStore: StoreType;

  const mockAddAccountDetailsIncomes = {
    title: 'Test',
    amount: '123',
    date: new Date('2023-05-29T11:04:20.338Z')
  };

  const mockAddAccountDetailsIncomesResponse = {
    title: 'Test',
    amount: '123',
    date: '2023-05-29T11:04:20.338Z'
  };

  beforeEach(() => {
    testStore = setupStore();
  });

  it('Add Account Incomes to store', async () => {
    addAccountIncomeMock.mockResolvedValueOnce(
      mockAddAccountDetailsIncomesResponse
    );

    await testStore.dispatch(
      addAccountIncome({ account_id: 1, data: mockAddAccountDetailsIncomes })
    );

    expect(testStore.getState().accountDetailsIncomes.incomes[0]).toMatchObject(
      mockAddAccountDetailsIncomesResponse
    );
  });

  it('Do not add Account Incomes to store', async () => {
    addAccountIncomeMock.mockRejectedValueOnce({});

    await testStore.dispatch(
      addAccountIncome({ account_id: 1, data: mockAddAccountDetailsIncomes })
    );

    expect(testStore.getState().accountDetailsIncomes.incomes).toMatchObject(
      []
    );
  });
});

describe('accountDetailsIncomesSlice > getAccountIncomes', () => {
  const mockDate = new Date('2023-04-19');

  let testStore: StoreType;

  const mockGetAccountIncomes = [
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

  it('Get Incomes from Store', async () => {
    getAccountIncomesMock.mockResolvedValueOnce(mockGetAccountIncomes);

    await testStore.dispatch(
      getAccountIncomes({ account_id: 1, date: mockDate })
    );

    expect(testStore.getState().accountDetailsIncomes.incomes).toEqual(
      mockGetAccountIncomes
    );
  });

  it('Do not get Incomes from Store', async () => {
    getAccountIncomesMock.mockRejectedValueOnce({});

    await testStore.dispatch(
      getAccountIncomes({ account_id: 1, date: mockDate })
    );

    expect(testStore.getState().accountDetailsIncomes.incomes).toEqual([]);
  });
});

describe('accountDetailsIncomesSlice > editAccountIncome', () => {
  it('Get edited Account Incomes from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      accountDetailsIncomes: {
        incomes: [storeValue],
        isLoading: false
      }
    });

    const mockEditAccountIncome = {
      id: 123,
      title: 'Test1111',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    const mockEditAccountIncomeResponse = {
      id: 123,
      title: 'Test1111',
      amount: '123',
      date: '2023-05-29T11:04:20.338Z'
    };

    editAccountIncomeMock.mockResolvedValueOnce(mockEditAccountIncomeResponse);

    expect(testStore.getState().accountDetailsIncomes.incomes[0]).toMatchObject(
      storeValue
    );

    await testStore.dispatch(editAccountIncome(mockEditAccountIncome));

    expect(testStore.getState().accountDetailsIncomes.incomes[0]).toMatchObject(
      mockEditAccountIncomeResponse
    );
  });

  it('Do not Get Edited Account Incomes from Store', async () => {
    //given
    const testStore = setupStore();
    editAccountIncomeMock.mockRejectedValueOnce({});

    const mockAddAccountIncome = {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    //then
    await testStore.dispatch(editAccountIncome(mockAddAccountIncome));

    //expect
    expect(testStore.getState().income.income).toMatchObject([]);
  });
});

describe('accountDetailsIncomesSlice > deleteAccountIncome', () => {
  it('Should not delete Account Income from store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      accountDetailsIncomes: {
        incomes: [storeValue],
        isLoading: false
      }
    });

    deleteAccountIncomeMock.mockRejectedValueOnce({});

    expect(testStore.getState().accountDetailsIncomes.incomes[0]).toMatchObject(
      storeValue
    );

    await testStore.dispatch(deleteAccountIncome(123));

    expect(testStore.getState().accountDetailsIncomes.incomes[0]).toMatchObject(
      storeValue
    );
  });

  it('Should delete AccountIncome from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      accountDetailsIncomes: {
        incomes: [storeValue],
        isLoading: false
      }
    });
    deleteAccountIncomeMock.mockResolvedValueOnce(storeValue);

    expect(testStore.getState().accountDetailsIncomes.incomes[0]).toMatchObject(
      storeValue
    );

    await testStore.dispatch(deleteAccountIncome(123));

    expect(testStore.getState().accountDetailsIncomes.incomes).toEqual([]);
  });
});
