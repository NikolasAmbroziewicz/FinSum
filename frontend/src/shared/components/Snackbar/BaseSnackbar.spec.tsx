import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import BaseSnackbar from './BaseSnackbar';
import { SnackbarType } from './type';

const handlerClick = vi.fn();

describe('BaseSnackbar > closeAction', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('Close Snackbar on icon click', async () => {
    const wrapper = render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.neutral}
      />
    );
    const button = wrapper.container.querySelector('button');

    await act(() => {
      button?.click();
    });

    expect(handlerClick).toHaveBeenCalled();
  });

  it('Close Snackbar after timeOut finished', () => {
    render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.neutral}
      />
    );
    vi.advanceTimersByTime(2000);

    expect(handlerClick).toHaveBeenCalled();
  });
});

describe('BaseSnackbar > styles > snackbar', () => {
  it('Contains mobile wrapper Style', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200
    });
    const wrapper = render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.neutral}
      />
    );
    const divElement = wrapper.container.querySelector('div');

    expect(divElement?.className).contains(
      'right-0 bottom-0 w-[calc(100vw_-_2rem)] m-4 p-4'
    );
  });

  it('Containa Desktop wrapper Style', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900
    });
    const wrapper = render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.neutral}
      />
    );
    const divElement = wrapper.container.querySelector('div');

    expect(divElement?.className).contains('right-7 bottom-7 py-4 px-6');
  });
});

describe('BaseSnackbar > styles > snackbarColor', () => {
  it('Contains Nutral colors', () => {
    const wrapper = render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.neutral}
      />
    );

    const divElement = wrapper.container.querySelector('div');

    expect(divElement?.className).contains('border-sky-600 bg-sky-100');
  });

  it('Contains Danger colors', () => {
    const wrapper = render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.danger}
      />
    );

    const divElement = wrapper.container.querySelector('div');

    expect(divElement?.className).contains('border-red-600 bg-red-100');
  });

  it('Contains Success colors', () => {
    const wrapper = render(
      <BaseSnackbar
        message="Test"
        onClick={handlerClick}
        type={SnackbarType.success}
      />
    );

    const divElement = wrapper.container.querySelector('div');

    expect(divElement?.className).contains('border-teal-600 bg-teal-100');
  });
});
