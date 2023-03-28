import { describe, expect, it } from 'vitest';
import InputLabel from './InputLabel';
import { mockInputLabelProps } from './InputLabel.mock';

describe('InputLabel', () => {
  it('define', () => {
    expect(InputLabel(mockInputLabelProps.base)).toMatchSnapshot();
  });
});
