import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLogin } from './useLogin';

const mockUseNaviagate = vi.fn();
const mockUseDispatch = vi.fn();

const loginValue = {
  email: 'test@com.pl',
  password: 'nikolas123'
};

vi.mock('react-redux', () => ({
  ...vi.importMock('react-redux'),
  useDispatch: vi.fn().mockReturnValue(() => ({
    unwrap: mockUseDispatch
  }))
}));

vi.mock('react-router-dom', () => ({
  ...vi.importMock('react-router-dom'),
  useNavigate: vi.fn().mockImplementation(() => mockUseNaviagate)
}));

describe('useLogin > handleFormSubmit', () => {
  it('DispatchAction and Navigate to Dashboard', async () => {
    mockUseDispatch.mockImplementation(() => {});
    const { result } = renderHook(() => useLogin());

    await act(() => {
      result.current.handleFormSubmit(loginValue);
    });

    expect(mockUseDispatch).toBeCalled();
    expect(mockUseNaviagate).toBeCalledWith('/dashboard');
  });

  it('Display Error Message when data is incorrect', async () => {
    mockUseDispatch.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Data Incorrect'
        }
      }
    });
    const { result } = renderHook(() => useLogin());

    await act(() => {
      result.current.handleFormSubmit(loginValue);
    });

    expect(result.current.loginError).toEqual('Data Incorrect');
  });

  it('Dispaly Error Message when something is wrong with connection or with server', async () => {
    mockUseDispatch.mockRejectedValue({});
    const { result } = renderHook(() => useLogin());

    await act(() => {
      result.current.handleFormSubmit(loginValue);
    });

    expect(result.current.loginError).toEqual(
      'Upps Something went Wrong! Try Again Later or Check your internet Connection.'
    );
  });
});
