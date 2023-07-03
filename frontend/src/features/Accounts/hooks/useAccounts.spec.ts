import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAccount } from './useAccounts'

const mockOnClose = vi.fn()
const mockHandleNotification = vi.fn()
const mockUseDispatch = vi.fn()

const mockAccount =  {
  id: 1, 
  title: 'Test Account',
  currency: 'USD'
}

vi.mock('react-redux', () => ({
  ...vi.importMock('react-redux'),
  useDispatch: vi.fn().mockImplementation(() => mockUseDispatch)
}))

vi.mock('src/context/NotificationContext', () => ({
  useNotificationContext: () => ({
    handleNotification: mockHandleNotification
  })
}))


describe('useAccount > handleAddAccounts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Dispatch addAccount action', () => {
    const { result } = renderHook(() => useAccount({}))

    act(() => {
      result.current.handleAddAccounts(mockAccount)
    })

    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })
  
  it('Handle onClose action and handleNotification from NotifiacationContext', () => {
    const { result } = renderHook(() => useAccount({onClose: mockOnClose}))  

    act(() => {
      result.current.handleAddAccounts(mockAccount)
    })

    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})

describe('useAccount > handleEditAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Dispatch editAccount action', () => {
    const { result } = renderHook(() => useAccount({}))

    act(() => {
      result.current.handleEditAccounts(mockAccount)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useAccount({onClose: mockOnClose}))

    act(() => {
      result.current.handleEditAccounts(mockAccount)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})

describe('useAccount > handleDeleteAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Dispatch deleteAccount action', () => {
    const { result } = renderHook(() => useAccount({}))

    act(() => {
      result.current.handleDeleteAccounts(2)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useAccount({onClose: mockOnClose}))

    act(() => {
      result.current.handleDeleteAccounts(2)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})
