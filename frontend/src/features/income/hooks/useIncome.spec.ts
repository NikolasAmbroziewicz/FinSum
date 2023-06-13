import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi }  from 'vitest'

import { useIncome } from './useIncome'

const mockOnClose = vi.fn()
const mockHandleNotification = vi.fn()
const mockUseDispatch = vi.fn()

const mockIncome = {
  id:1 ,
  title: 'Test1',
  currency: 'USD',
  amount: '112',
  date: new Date('Mon Jun 12 2020 13:00:00')
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

describe('useIncome > handleAddIncome', () => {
  it('Dispatch addIncome action', () => {
    const { result } = renderHook(() => useIncome({}))

    act(() => {
      result.current.handleAddIncome(mockIncome)
    })

    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useIncome({onClose: mockOnClose}))  

    act(() => {
      result.current.handleAddIncome(mockIncome)
    })

    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})

describe('useIncome > handleEditIncome', () => {
  it('Dispatch editIncome action', () => {
    const { result } = renderHook(() => useIncome({}))

    act(() => {
      result.current.handleEditIncome(mockIncome)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useIncome({onClose: mockOnClose}))

    act(() => {
      result.current.handleEditIncome(mockIncome)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})

describe('useIncome > handleDeleteIncome', () => {
  it('Dispatch deleteAction action', () => {
    const { result } = renderHook(() => useIncome({}))

    act(() => {
      result.current.handleDeleteIncome(2)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useIncome({onClose: mockOnClose}))

    act(() => {
      result.current.handleDeleteIncome(2)
    })
  
    expect(mockUseDispatch).toHaveBeenCalled()
    expect(mockHandleNotification).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})