import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useNavigation } from './useNavigation';
vi.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: 'http://localhost:3000/test'
  })
}));

describe('useNavigation > handleNavOpen', () => {
  it('Handle open navigation', async () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.isOpen).toBeFalsy();

    await act(() => {
      result.current.handleNavOpen();
    });

    expect(result.current.isOpen).toBeTruthy();
  });

  it('Closed by default', async () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.isOpen).toBeFalsy();
  });
});

describe('useNavigation > activeRoute', () => {
  it('Return correct background color when path is matched', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.activeRoute('test')).toEqual('bg-sky-700');
  });

  it('Return correct background color when path is not matched', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.activeRoute('/text')).toEqual('bg-inherit');
  });
});
