import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useModal } from './useModal'

describe('useModal', () => {
  it('Modal close by default', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.isOpen).toBeFalsy()
  })

  it('Open Modal after calling handler', async () => {
    const { result } = renderHook(() => useModal())

    await act(() => {
      result.current.handleOpenModal()
    })

    expect(result.current.isOpen).toBeTruthy()
  })
})