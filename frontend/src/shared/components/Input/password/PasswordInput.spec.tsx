import { describe, expect, it } from 'vitest';
import { render, act } from '@testing-library/react';

import PasswordInput from './PasswordInput';

describe('PasswordInput > handlers', () => {
  it('Show hidden icon password by default', () => {
    const wrapper = render(<PasswordInput id="test" placeholder="test" />);

    const icon = wrapper.container.querySelector(
      '[data-test="passwordInvisibleIcon"]'
    );

    expect(icon).toBeTruthy();
  });

  it('Show icon password by default', async () => {
    const wrapper = render(<PasswordInput id="test" placeholder="test" />);

    await act(() => {
      wrapper.container.querySelector('button')?.click();
    });

    const icon = wrapper.container.querySelector(
      '[data-test="passwordVisibleIcon"]'
    );

    expect(icon).toBeTruthy();
  });
});
