import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import BaseButton from './BaseButton';
import { ButtonTheme } from './types';

//MOCKS
const CHILDREN_PROPS = 'Submit';

describe('BaseButton', () => {
  it('render > contains correct children text', () => {
    render(<BaseButton children={CHILDREN_PROPS} />);

    const text = screen.getByText('Submit');

    expect(text.textContent).toBeTruthy();
  });
});

describe('BaseButton > Styles', () => {
  it('Contains correct styles when color is Base', () => {
    const wrapprer = render(
      <BaseButton children={CHILDREN_PROPS} color={ButtonTheme.base} />
    );

    const button = wrapprer.container.querySelector('button');

    expect(button?.className).contains('bg-sky-500 hover:bg-sky-600');
  });

  it('Contains correcet styles when color is Error', () => {
    const wrapprer = render(
      <BaseButton children={CHILDREN_PROPS} color={ButtonTheme.error} />
    );

    const button = wrapprer.container.querySelector('button');

    expect(button?.className).contains('bg-red-600 hover:bg-red-500');
  });
});
