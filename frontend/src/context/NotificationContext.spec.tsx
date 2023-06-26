import { describe, it, expect } from 'vitest'
import { act, renderHook }  from '@testing-library/react'

import { useNotificationContext, NotificationProvider } from './NotificationContext'

import { SnackbarType } from 'src/shared/components/Snackbar/type'

const wrapper = ({ children }: { children: JSX.Element}) => <NotificationProvider>{children}</NotificationProvider>

describe('notificationContext > default', () => {
  it('Contains correct default value', () => {
    const { result }  = renderHook(() => useNotificationContext(), { wrapper })
    
    expect(result.current.notificationType).toEqual(SnackbarType.neutral)
    expect(result.current.showNotification).toEqual(false)
    expect(result.current.notificationValue).toEqual('')
  })
})

describe('notificationContext > handleNotification', () => {
  it('Correct handle notification and pass data', () => {
    const { result }  = renderHook(() => useNotificationContext(), { wrapper })

    act(() => {
      result.current.handleNotification('hello', SnackbarType.danger)
    })

    expect(result.current.notificationType).toEqual(SnackbarType.danger)
    expect(result.current.showNotification).toEqual(true)
    expect(result.current.notificationValue).toEqual('hello')
  })
})

describe('notificationContext > handleShowNotification', () => {
  it('Toggle show notification', () => {
    const { result }  = renderHook(() => useNotificationContext(), { wrapper })

    act(() => {
      result.current.handleShowNotification()
    })
  
    expect(result.current.showNotification).toBeTruthy()
  })
})
