import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react';

import Loading from './Loading'

import { LoadingPosition, LoadingSize } from './types'

describe('Loding > styles > size', () => {
  it('Contains small size styles', () => {
    const wrapper = render(
      <Loading 
        size={LoadingSize.small}
      />
    )

    const element = wrapper.container.querySelectorAll('div')[1]

    expect(element.className).contains('w-6 h-6 border-[3px]')
  })

  it('Contains medium size styles', () => {
    const wrapper = render(
      <Loading 
      />
    )

    const element = wrapper.container.querySelectorAll('div')[1]

    expect(element.className).contains('w-8 h-8 border-[4px]')
  })

  it('Contains big size styles', () => {
    const wrapper = render(
      <Loading 
        size={LoadingSize.large}
      />
    )

    const element = wrapper.container.querySelectorAll('div')[1]

    expect(element.className).contains('w-10 h-10 border-[4px]')
  })
})

describe('Loding > styles > position', () => {
  it('Contains Position start styles', () => {
    const wrapper = render(
      <Loading 
        position={LoadingPosition.start}
      />
    )

    const element = wrapper.container.querySelectorAll('div')[0]

    expect(element.className).contains('items-start')
  })

  it('Contains Position center styles', () => {
    const wrapper = render(
      <Loading 
        position={LoadingPosition.center}
      />
    )

    const element = wrapper.container.querySelectorAll('div')[0]

    expect(element.className).contains('items-center')
  })

  it('Contains Position end styles', () => {
    const wrapper = render(
      <Loading 
        position={LoadingPosition.end}
      />
    )

    const element = wrapper.container.querySelectorAll('div')[0]

    expect(element.className).contains('items-end')
  })
})