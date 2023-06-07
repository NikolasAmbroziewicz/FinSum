import { describe, it, expect } from 'vitest'
import { renderHook }  from '@testing-library/react'

import { useNotificationContext } from './NotificationContext'

import { SnackbarType } from 'src/shared/components/snackbar/type'

describe('notificationContext', () => {
  it('Contains correct default value', () => {
    const { result }  = renderHook(() => useNotificationContext())
    
    expect(result.current.notificationType).toEqual(SnackbarType.neutral)
    expect(result.current.showNotification).toEqual(false)
    expect(result.current.notificationValue).toEqual('')
  })
})
