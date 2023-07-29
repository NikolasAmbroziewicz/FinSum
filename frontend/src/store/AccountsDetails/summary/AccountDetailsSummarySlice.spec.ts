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

const getSummaryAccountMock = vi.fn();

vi.mock('src/features/AccountDetails/api/AccountDetailsSummary', () => ({
  useAccountDetailsSummary: () => ({
    get_summary_account: getSummaryAccountMock
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
  let testStore: StoreType;

  beforeEach(() => {
    testStore = setupStore();
  });

  it('Should add Account Summary to Store', async () => {
    const mockResponse = {
      total_expense: 123,
      total_income: 123,
      account: {
        currency: 'USD'
      }
    };
    getSummaryAccountMock.mockResolvedValueOnce(mockResponse);

    await testStore.dispatch(
      getAccountSummary({ account_id: 13, date: new Date('2023-04-19') })
    );

    expect(testStore.getState().accountDetailsSummary.details).toEqual(
      mockResponse
    );
  });

  it('Should not add Account Summary to Store', async () => {
    getSummaryAccountMock.mockRejectedValueOnce({});

    await testStore.dispatch(
      getAccountSummary({ account_id: 13, date: new Date('2023-04-19') })
    );

    expect(testStore.getState().accountDetailsSummary.details).toEqual(
      initialStore
    );
  });
});
