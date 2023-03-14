import { describe, expect, it } from 'vitest';
import BaseButton, { IBaseButton } from './BaseButton';

const baseButtonProps: IBaseButton = {
  children: 'Submit',
  type: 'button'
};

describe('BaseButton', () => {
  it('defined', () => {
    expect(BaseButton(baseButtonProps)).toMatchSnapshot();
  });
});
