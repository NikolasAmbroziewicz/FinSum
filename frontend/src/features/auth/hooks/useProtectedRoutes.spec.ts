import { renderHook, act, } from '@testing-library/react'
import { describe, expect, it, vi} from 'vitest'

import { useProtectedRoutes } from './useProtectedRoutes'

const mockUseLocation = vi.fn()
const mockUseDispatch = vi.fn()

vi.mock('react-redux', () => ({
  ...vi.importMock('react-redux'),
  useDispatch: vi.fn().mockReturnValue(() => ({
    unwrap: mockUseDispatch
  }))
}))

vi.mock('react-router-dom', () => ({
  ...vi.importMock('react-router-dom'),
  useLocation: vi.fn().mockImplementation(() => ({pathname: 'hello'}))
}))

describe('useProtectedRoutes', () => {
  it('Dispatch Action, setAuthenticated and loading state', async () => {
    mockUseDispatch.mockImplementation(() => {})
    const { result } = renderHook(() => useProtectedRoutes())

    await act(() => {
      result.current.authUser()
    })
    
    expect(result.current.isAuthenticated).toBeTruthy()
    expect(result.current.isLoading).toBeFalsy
  })

  it('Handle rejection, setAuthenticated and loading state',async () => {
    mockUseDispatch.mockRejectedValue({})
    const { result } = renderHook(() => useProtectedRoutes())

    await act(() => {
      result.current.authUser()
    })
    
    expect(result.current.isAuthenticated).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy
  })
})