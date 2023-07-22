import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest';

import BaseInput from './BaseInput'


describe('BaseInput > style', () => {
  it('Contains border base class by default', () => { 
    const wrapper = render(
      <BaseInput
        id="test"
        placeholder='Test'
        type="Test"
      />
    )

    const input = wrapper.container.querySelector('input')

    expect(input?.className).contains('border-slate-300')
  })

  it('Contains border errror class', () => {
    const wrapper = render(
      <BaseInput
        id="test"
        placeholder='Test'
        type="Test"
        error={true}
      />
    )

    const input = wrapper.container.querySelector('input')

    expect(input?.className).contains('border-rose-400')
  })
})