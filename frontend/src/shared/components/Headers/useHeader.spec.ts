import { renderHook } from '@testing-library/react'

import { useHeader } from './useHeader'

import { Position, Variant } from './Header.types'

describe('useHeader > textColor', () => {
  it('Return dark text color', () => {
    const { result } = renderHook(() => useHeader(Variant.dark, Position.center))

    expect(result.current.textColor()).toBe('text-gray-600')
  })

  it('Return white text Color', () => {
    const { result } = renderHook(() => useHeader(Variant.light, Position.center))

    expect(result.current.textColor()).toBe('text-stone-50')
  })
})

describe('useHeader > textPosition', () => {
  it('Return dark text position center', () => {
    const { result } = renderHook(() => useHeader(Variant.dark, Position.center))

    expect(result.current.textPosition()).toBe('text-center')
  })

  it('Return dark text position left', () => {
    const { result } = renderHook(() => useHeader(Variant.dark, Position.left))

    expect(result.current.textPosition()).toBe('text-left')
  })

  it('Return dark text position right', () => {
    const { result } = renderHook(() => useHeader(Variant.dark, Position.right))

    expect(result.current.textPosition()).toBe('text-right')
  })
})