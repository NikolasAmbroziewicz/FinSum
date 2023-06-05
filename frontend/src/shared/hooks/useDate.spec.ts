import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { useDate } from './useDate'

describe('useDate', () => {
  it('Return correct format Date', () => {
    const { result } = renderHook(() => useDate())

    expect(result.current.dateFormat(new Date('2023-05-09T09:42:47.000Z'))).toEqual('May 9, 2023')
  })
})