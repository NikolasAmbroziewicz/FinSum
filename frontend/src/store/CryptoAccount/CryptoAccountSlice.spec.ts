import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it, vi } from 'vitest';

import { setupStore, StoreType } from '../main';

import {
  addCryptoAccounts,
  editCryptoAccounts,
  deleteCryptoAccounts,
  getCryptoAccounts,
} from './CryptoAccountSlice';

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));
describe('CryptoAccountsSlice > default state', () => {
  it('Should initially set account to empty Array', () => {
    const state = setupStore().getState().accounts;
    expect(state.accounts).toEqual([]);
  });

  it('Sould initially set loading status to false', () => {
    const state = setupStore().getState().accounts;
    expect(state.isLoading).toBeFalsy();
  });
});

describe('CryptoAccountsSlice > addAccount', () => {
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

  it('Add Accounts to Store', async () => {
    // given
    const mockAddAccount = {
      title: 'Test Account',
    };
    mock
      .onPost('http://localhost:8080/crypto-accounts/v1/add-crypto-account')
      .reply(200, mockAddAccount);

    // then
    await testStore.dispatch(addCryptoAccounts(mockAddAccount));

    // expect
    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(
      mockAddAccount
    );
  });

  it('Do not add to Store', async () => {
    // given
    const mockAddAccount = {
      title: 'Test Account',
    };
    mock
      .onPost('http://localhost:8080/crypto-accounts/v1/add-crypto-account')
      .networkErrorOnce();

    // then
    await testStore.dispatch(addCryptoAccounts(mockAddAccount));

    // expect
    expect(testStore.getState().cryptoAccounts.accounts).toMatchObject([]);
  });
});

describe('CryptoAccountsSlice > getAccounts', () => {
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

  it('Get Accounts from Store', async () => {
    // given
    const mockAddAccount = {
      title: 'Test Account',
    };
    mock
      .onGet('http://localhost:8080/crypto-accounts/v1/get-crypto-accounts')
      .reply(200, [mockAddAccount]);

    // then
    await testStore.dispatch(getCryptoAccounts());

    // expect
    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(
      mockAddAccount
    );
  });

  it('Do not Get Account from Store', async () => {
    // given
    mock
      .onGet('http://localhost:8080/crypto-accounts/v1/get-crypto-accounts')
      .networkErrorOnce();

    // then
    await testStore.dispatch(getCryptoAccounts());

    // expect
    expect(testStore.getState().cryptoAccounts.accounts).toMatchObject([]);
  });
});

describe('CryptoAccountsSlice > editAccounts', () => {
  const mockEditedValue = {
    id: 1,
    title: 'Test Account 1',
  };

  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Should Get Edited Account from Store', async () => {
    // given
    const storeValue = {
      id: 1,
      title: 'Test Account',
    };

    const testStore = setupStore({
      cryptoAccounts: {
        accounts: [storeValue],
        isLoading: false
      }
    });

    // then
    mock
      .onPut(`http://localhost:8080/crypto-accounts/v1/edit-account?id=1`)
      .reply(200, mockEditedValue);

    //expect
    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(storeValue);

    await testStore.dispatch(editCryptoAccounts(mockEditedValue));

    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(
      mockEditedValue
    );
  });

  it('Should not get Edited Account from Store', async () => {
    // given
    const testStore = setupStore();

    // then
    mock
      .onPut(`http://localhost:8080/crypto-accounts/v1/edit-account?id=1`)
      .networkErrorOnce();

    // expect
    await testStore.dispatch(editCryptoAccounts(mockEditedValue));
    expect(testStore.getState().cryptoAccounts.accounts).toMatchObject([]);
  });
});

describe('CryptoAccountsSlice > deleteAccounts', () => {
  let mock: any;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Should Return Empty Store after Account removed', async () => {
    // given
    const storeValue = {
      id: 1,
      title: 'Test Account',
    };

    const testStore = setupStore({
      cryptoAccounts: {
        accounts: [storeValue],
        isLoading: false
      }
    });

    // then
    mock
      .onDelete(`http://localhost:8080/crypto-accounts/v1/delete-account?id=1`)
      .reply(200, storeValue);

    //expect
    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(storeValue);

    await testStore.dispatch(deleteCryptoAccounts(1));

    expect(testStore.getState().cryptoAccounts.accounts).toMatchObject([]);
  });

  it('Should not return empty store after Account removed', async () => {
    // given
    const storeValue = {
      id: 1,
      title: 'Test Account',
    };

    const testStore = setupStore({
      cryptoAccounts: {
        accounts: [storeValue],
        isLoading: false
      }
    });

    // then
    mock
      .onDelete(`http://localhost:8080/crypto-accounts/v1/delete-account?id=1`)
      .networkErrorOnce();

    //expect
    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(storeValue);

    await testStore.dispatch(deleteCryptoAccounts(1));

    expect(testStore.getState().cryptoAccounts.accounts[0]).toMatchObject(storeValue);
  });
});
