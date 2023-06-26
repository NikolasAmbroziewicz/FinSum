import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { describe, expect, it, vi } from 'vitest'

import { setupStore, StoreType } from '../main'
import { signUpUser, signInUser, refreshTokens } from './UserSlice'

//mocks
const setToLocalStorageMock = vi.fn()

vi.mock('src/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    setToLocalStorage: setToLocalStorageMock,
    getFromLocalStorage: vi.fn().mockResolvedValue({
      accessToken: '',
      refreshToken: ''
    })
  })
}));

describe('userSlice > default state', () => {
  it('Should contain isAuthenticated as false', () => {
    expect(setupStore().getState().auth.isAuthenticated).toBeFalsy()
  })

  it('Should contain user as undefined', () => {
    expect(setupStore().getState().auth.user).toBeUndefined()
  })

  it('Should contain tokens as undefined', () => {
    expect(setupStore().getState().auth.tokens).toMatchObject({
      refreshToken: undefined,
      accessToken: undefined
    })
  })
})

describe('userSlice > signUpUser', () => {
  let mock: any;
  let testStore: StoreType;
  
  beforeEach(() => {
    testStore = setupStore()
  })

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  const mockData = {
    name: 'Test1',
    surname: 'Test2',
    email: 'test@com.pl',
    password: 'test1234',
    passwordConfirmation: 'test1234'
  }

  it('Should set token to localStorage and api response to store  when user is signUp', async () => {
    //given
    const apiResponse = {
      isAuthenticated: true,
      user: {
        email: 'test@com.pl',
        name: 'Test1',
        surname: 'Testw',
      },
      tokens: {accessToken: '', refreshToken: ''}
    }

    //then
    mock.onPost('http://localhost:8080/auth/v1/signup').reply(200, apiResponse);

    await testStore.dispatch(signUpUser(mockData))

    expect(setToLocalStorageMock).toHaveBeenCalled()
    expect(testStore.getState().auth).toMatchObject(apiResponse)
  })

  it('Should not set token and api response to store', async () => {
    //given
    const initialStore = {
      isAuthenticated: false,
      user: undefined,
      tokens: {
        refreshToken: undefined,
        accessToken: undefined
      }
    };
    mock.onPost(`http://localhost:8080/auth/v1/signup`).networkErrorOnce();

    await testStore.dispatch(signUpUser(mockData))

    expect(testStore.getState().auth).toMatchObject(initialStore)
  })
})

describe('userSlice > signInUser', () => {
  let mock: any;
  let testStore: StoreType;
  
  beforeEach(() => {
    testStore = setupStore()
  })

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  const mockData = {
    email: 'test@com.pl',
    password: 'test1234',
  }

  it('Should set token to localStorage and api response to store  when user has signedIn', async () => {
    //given
    const apiResponse = {
      isAuthenticated: true,
      user: {
        email: 'test@com.pl',
        name: 'Test1',
        surname: 'Testw',
      },
      tokens: {accessToken: '', refreshToken: ''}
    }
    mock.onPost('http://localhost:8080/auth/v1/signin').reply(200, apiResponse);

    await testStore.dispatch(signInUser(mockData))

    expect(setToLocalStorageMock).toHaveBeenCalled()
    expect(testStore.getState().auth).toMatchObject(apiResponse)
  })

  it('Should not set token and api response to store', async () => {
    //given
    const initialStore = {
      isAuthenticated: false,
      user: undefined,
      tokens: {
        refreshToken: undefined,
        accessToken: undefined
      }
    };
    mock.onPost(`http://localhost:8080/auth/v1/signin`).networkErrorOnce();

    await testStore.dispatch(signInUser(mockData))

    expect(testStore.getState().auth).toMatchObject(initialStore)
  })
})

describe('userSlice > signInUser', () => {
  let mock: any;
  let testStore: StoreType;
  
  beforeEach(() => {
    testStore = setupStore()
  })

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Should set token to localStorage and api response to store  when user has signedIn', async () => {
    //given
    const apiResponse = {accessToken: '', refreshToken: ''}
    const storeToken = {
      refreshToken: undefined,
      accessToken: undefined
    }
    mock.onGet('http://localhost:8080/auth/v1/refresh_tokens').reply(200, apiResponse);

    await testStore.dispatch(refreshTokens())

    expect(setToLocalStorageMock).toHaveBeenCalled()
    expect(testStore.getState().auth.tokens).toMatchObject(apiResponse)
  })

  it('Should not set token and api response to store', async () => {
    //given
    const initialStore = {
      isAuthenticated: false,
      user: undefined,
      tokens: {
        refreshToken: undefined,
        accessToken: undefined
      }
    };
    mock.onGet(`http://localhost:8080/auth/v1/refresh_tokens`).networkErrorOnce();

    await testStore.dispatch(refreshTokens())

    expect(testStore.getState().auth.tokens).toMatchObject(initialStore.tokens)
  })
})