import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useScreen } from './useScreen';

describe('useScreen', () => {
  it('isXSmallScreen', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200
    });
    const { result } = renderHook(() => useScreen());

    expect(result.current.isXSmallScreen()).toBeTruthy();
  });

  it('isMobileScreen', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 550
    });
    const { result } = renderHook(() => useScreen());

    expect(result.current.isMobileScreen()).toBeTruthy();
  });

  it('isTabletScreen', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 850
    });
    const { result } = renderHook(() => useScreen());

    expect(result.current.isTabletScreen()).toBeTruthy();
  });

  it('isDesktopScreen', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1150
    });
    const { result } = renderHook(() => useScreen());

    expect(result.current.isDesktopScreen()).toBeTruthy();
  });

  it('isLargeScreen', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1400
    });
    const { result } = renderHook(() => useScreen());

    expect(result.current.isLargeScreen()).toBeTruthy();
  });
});
