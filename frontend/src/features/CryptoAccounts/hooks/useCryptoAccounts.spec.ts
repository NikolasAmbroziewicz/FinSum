import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCryptoAccounts } from './useCryptoAccounts';

const mockOnClose = vi.fn();
const mockHandleNotification = vi.fn();
const mockUseDispatch = vi.fn();

const mockAccount = {
  id: 1,
  title: 'Test Account',
};

vi.mock('react-redux', () => ({
  ...vi.importMock('react-redux'),
  useDispatch: vi.fn().mockImplementation(() => mockUseDispatch)
}));

vi.mock('src/context/NotificationContext', () => ({
  useNotificationContext: () => ({
    handleNotification: mockHandleNotification
  })
}));

describe('useCryptoAccounts > handleAddAccounts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Dispatch addAccount action', () => {
    const { result } = renderHook(() => useCryptoAccounts({}));

    act(() => {
      result.current.handleAddCrytoAccount(mockAccount);
    });

    expect(mockUseDispatch).toHaveBeenCalled();
    expect(mockHandleNotification).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Handle onClose action and handleNotification from NotifiacationContext', () => {
    const { result } = renderHook(() => useCryptoAccounts({ onClose: mockOnClose }));

    act(() => {
      result.current.handleAddCrytoAccount(mockAccount);
    });

    expect(mockUseDispatch).toHaveBeenCalled();
    expect(mockHandleNotification).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});

describe('useCryptoAccounts > handleEditAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Dispatch editAccount action', () => {
    const { result } = renderHook(() => useCryptoAccounts({}));

    act(() => {
      result.current.handleEditCryptoAccount(mockAccount);
    });

    expect(mockUseDispatch).toHaveBeenCalled();
    expect(mockHandleNotification).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useCryptoAccounts({ onClose: mockOnClose }));

    act(() => {
      result.current.handleEditCryptoAccount(mockAccount);
    });

    expect(mockUseDispatch).toHaveBeenCalled();
    expect(mockHandleNotification).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});

describe('useCryptoAccounts > handleDeleteAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Dispatch deleteAccount action', () => {
    const { result } = renderHook(() => useCryptoAccounts({}));

    act(() => {
      result.current.handleDeleteCryptoAccount(2);
    });

    expect(mockUseDispatch).toHaveBeenCalled();
    expect(mockHandleNotification).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Handle onClose action and handleNotification from NotificationContext', () => {
    const { result } = renderHook(() => useCryptoAccounts({ onClose: mockOnClose }));

    act(() => {
      result.current.handleDeleteCryptoAccount(2);
    });

    expect(mockUseDispatch).toHaveBeenCalled();
    expect(mockHandleNotification).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
