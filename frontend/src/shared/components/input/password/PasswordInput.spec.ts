import { describe, expect, it } from 'vitest';
import { mockPasswordInputProps } from './PasswordInput.mocks';
import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
  it('define', () => {
    expect(PasswordInput(mockPasswordInputProps.base)).toMatchSnapshot();
  });
});
