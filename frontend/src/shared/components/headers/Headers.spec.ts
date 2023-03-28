import { describe, expect, it } from 'vitest';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import { mockHeadersBaseProps } from './Header.mocks';

describe('Headers', () => {
  it('H1 define', () => {
    expect(H1(mockHeadersBaseProps.base)).toMatchSnapshot();
  });

  it('H2 define', () => {
    expect(H2(mockHeadersBaseProps.base)).toMatchSnapshot();
  });

  it('H3 define', () => {
    expect(H3(mockHeadersBaseProps.base)).toMatchSnapshot();
  });

  it('H4 define', () => {
    expect(H4(mockHeadersBaseProps.base)).toMatchSnapshot();
  });
});
