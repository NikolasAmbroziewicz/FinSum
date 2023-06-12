import { renderHook, act, } from '@testing-library/react'
import { describe, expect, it, vi} from 'vitest'

import { useRegister } from './useRegister'

const mockUseNaviagate = vi.fn()
const mockUseDispatch = vi.fn()

const registerValue = {
  name: 'Test2',
  surname: 'Test2',
  email: 'test@com.pl',
  password: 'Test1234',
  passwordConfirmation: 'Test1234'
}

vi.mock('react-redux', () => ({
  ...vi.importMock('react-redux'),
  useDispatch: vi.fn().mockReturnValue(() => ({
    unwrap: mockUseDispatch
  }))
}))

vi.mock('react-router-dom', () => ({
  ...vi.importMock('react-router-dom'),
  useNavigate: vi.fn().mockImplementation(() => mockUseNaviagate)
}))

describe('useRegister > handleFormSubmit', () => {
  it('DispatchAction and Navigate to Dashboard', async () => {
    mockUseDispatch.mockImplementation(() => {})
    const { result } = renderHook(() => useRegister())

    await act(() => {
      result.current.handleFormSubmit(registerValue)
    })

    expect(mockUseDispatch).toBeCalled()
    expect(mockUseNaviagate).toBeCalledWith('/dashboard')
  })

  it('Display Error Message when data is incorrect',async () => {
    mockUseDispatch.mockRejectedValueOnce({
      response: { 
        data: { 
          message: 'Data Incorrect'
        }
      }
    })
    const { result } = renderHook(() => useRegister())

    await act(() => {
      result.current.handleFormSubmit(registerValue)
    })

    expect(result.current.registerError).toEqual('Data Incorrect')
  })

  it('Dispaly Error Message when something is wrong with connection or with server', async () => {
    mockUseDispatch.mockRejectedValue({})
    const { result } = renderHook(() => useRegister())

    await act(() => {
      result.current.handleFormSubmit(registerValue)
    })

    expect(result.current.registerError).toEqual('Upps Something went Wrong! Try Again Later or Check your internet Connection.')
  })
})