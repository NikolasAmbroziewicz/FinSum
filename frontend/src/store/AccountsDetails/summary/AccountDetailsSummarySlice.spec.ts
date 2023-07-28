import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { describe, expect, it, vi } from 'vitest';
import { setupStore, StoreType } from '../../main';

import { getAccountSummary } from './AccountDetailsSummarySlice';

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));

const initialStore = {
  total_expense: 0,
  total_income: 0,
  account: {
    currency: ''
  }
};

describe('accountDetailsSummarySlice > default state', () => {
  it('Should initially have correct store value', () => {
    const state = setupStore().getState().accountDetailsSummary;

    expect(state.details).toMatchObject(initialStore);
  });
});

describe('accountDetailsSummarySlice > getAccountSummary', () => {
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

  it('Should add Account Summary to Store', async () => {
    const mockResponse = {
      total_expense: 123,
      total_income: 123,
      account: {
        currency: 'USD'
      }
    };

    mock
      .onGet(
        'http://localhost:8080/account-summary/v1/get-summary?account_id=13&date=Wed Apr 19 2023 02:00:00 GMT+0200 (Central European Summer Time)'
      )
      .reply(200, mockResponse);

    await testStore.dispatch(
      getAccountSummary({ account_id: 13, date: new Date('2023-04-19') })
    );

    expect(testStore.getState().accountDetailsSummary.details).toEqual(
      mockResponse
    );
  });

  it('Should not add Account Summary to Store', async () => {
    mock
      .onGet(
        'http://localhost:8080/account-summary/v1/get-summary?account_id=13&date=Wed Apr 19 2023 02:00:00 GMT+0200 (Central European Summer Time)'
      )
      .networkErrorOnce();

    await testStore.dispatch(
      getAccountSummary({ account_id: 13, date: new Date('2023-04-19') })
    );

    expect(testStore.getState().accountDetailsSummary.details).toEqual(
      initialStore
    );
  });
});
