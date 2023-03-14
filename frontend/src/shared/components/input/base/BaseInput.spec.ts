import { describe, expect, it } from 'vitest';
import BaseInput from './BaseInput';
import { mockBaseInputProps } from './BaseInput.mocks';

describe('BaseInput', () => {
  it('defined', () => {
    expect(BaseInput(mockBaseInputProps.base)).toMatchSnapshot();
  });
});
