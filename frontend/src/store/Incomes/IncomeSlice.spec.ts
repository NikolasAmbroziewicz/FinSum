import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it, vi } from 'vitest';

import { setupStore, StoreType } from '../main';
import { addIncome, getIncome, editIncome, deleteIncome } from './IncomesSlice';

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));

describe('incomeSlice > default state', () => {
  it('Should initially set income to empty Array', () => {
    const state = setupStore().getState().income;
    expect(state.income).toEqual([]);
  });

  it('Should initially set income loading status to false', () => {
    const state = setupStore().getState().income;
    expect(state.isLoading).toBeFalsy();
  });
});

describe('incomeSlice > addIncome', () => {
  let mock: any;
  let testStore: StoreType;

  beforeEach(() => {
    testStore = setupStore();
  });

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Add Income to store', async () => {
    //given
    const mockAddIncome = {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    //expect
    const mockAddIncomeResponse = {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: '2023-05-29T11:04:20.338Z'
    };

    //than
    mock
      .onPost(`http://localhost:8080/income/v1/add-income`)
      .reply(200, mockAddIncome);

    await testStore.dispatch(addIncome(mockAddIncome));

    // then
    expect(testStore.getState().income.income[0]).toMatchObject(
      mockAddIncomeResponse
    );
  });

  it('Do not add Income to store', async () => {
    //given
    const mockAddIncome = {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    mock
      .onPost(`http://localhost:8080/income/v1/add-income`)
      .networkErrorOnce();

    await testStore.dispatch(addIncome(mockAddIncome));

    expect(testStore.getState().income.income).toMatchObject([]);
  });
});

describe('incomeSlice > getIncome', () => {
  let mock: any;
  let testStore: StoreType;

  beforeEach(() => {
    testStore = setupStore();
  });

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Get Income from store', async () => {
    //given
    const mockGetIncome = [
      {
        title: 'Test',
        currency: 'USD',
        amount: '123',
        date: '2023-05-29T11:04:20.338Z'
      }
    ];

    mock
      .onGet(
        `http://localhost:8080/income/v1/get-income?date=${new Date('2020')}`
      )
      .reply(200, mockGetIncome);

    await testStore.dispatch(getIncome(new Date('2020')));

    // then
    expect(testStore.getState().income.income[0]).toMatchObject(
      mockGetIncome[0]
    );
  });

  it('Do not get Income from store', async () => {
    mock
      .onGet(
        `http://localhost:8080/income/v1/get-income?date=${new Date('2020')}`
      )
      .networkErrorOnce();

    await testStore.dispatch(getIncome(new Date('2020')));

    expect(testStore.getState().income.income).toMatchObject([]);
  });
});

describe('incomeSlice > editIncome', () => {
  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Get edited Income from Store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      income: {
        income: [storeValue],
        isLoading: false
      }
    });

    const mockEditIncome = {
      id: 123,
      title: 'Test1111',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    const mockEditIncomeResponse = {
      id: 123,
      title: 'Test1111',
      currency: 'USD',
      amount: '123',
      date: '2023-05-29T11:04:20.338Z'
    };

    //then
    mock
      .onPut(`http://localhost:8080/income/v1/edit-income?id=123`)
      .reply(200, mockEditIncomeResponse);

    expect(testStore.getState().income.income[0]).toMatchObject(storeValue);

    await testStore.dispatch(editIncome(mockEditIncome));

    expect(testStore.getState().income.income[0]).toMatchObject(
      mockEditIncomeResponse
    );
  });

  it('Do not get edited Income from store', async () => {
    //given
    const testStore = setupStore();
    mock
      .onPut('http://localhost:8080/income/v1/edit-income?id=123')
      .networkErrorOnce();
    const mockAddIncome = {
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.338Z')
    };

    //then
    await testStore.dispatch(editIncome(mockAddIncome));

    //expect
    expect(testStore.getState().income.income).toMatchObject([]);
  });
});

describe('incomeSlice > deleteIncome', () => {
  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Should delete income from store', async () => {
    //given
    const storeValue = {
      id: 123,
      title: 'Test',
      currency: 'USD',
      amount: '123',
      date: new Date('2023-05-29T11:04:20.334Z')
    };

    const testStore = setupStore({
      income: {
        income: [storeValue],
        isLoading: false
      }
    });
    mock
      .onDelete('http://localhost:8080/income/v1/delete-income?id=123')
      .reply(200, storeValue);

    //then
    expect(testStore.getState().income.income[0]).toMatchObject(storeValue);

    await testStore.dispatch(deleteIncome(123));

    expect(testStore.getState().income.income).toEqual([]);
  });
});
