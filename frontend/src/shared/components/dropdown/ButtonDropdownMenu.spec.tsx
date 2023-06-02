import {render, act} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'

import BaseDropdownMenu from './ButtonDropdownMenu'

import { dropdownContent } from './mocks/mocks'

let buttonHandler = vi.fn()

describe('ButtonDropdownMenu > styles', () => {
  it('Contains correct Defaults', () => {
    const wrapper = render(
      <BaseDropdownMenu 
        dropdownContent={dropdownContent} 
        error={false}
        handleValue={buttonHandler}
        value={'Test'}
        />
      )

      const button = wrapper.container.querySelector('button')

      expect(button?.className).contains('border-slate-300');
  })

  it('Contains correct Errors', () => {
    const wrapper = render(
      <BaseDropdownMenu 
        dropdownContent={dropdownContent} 
        error={true}
        handleValue={buttonHandler}
        value={'Test'}
        />
      )

      const button = wrapper.container.querySelector('button')

      expect(button?.className).contains('border-rose-400');
  })
})

describe('ButtonDropdownMenu > Menu', () => {
  it('Open Menu onClick',async () => {
    const wrapper = render(
      <BaseDropdownMenu 
        dropdownContent={dropdownContent} 
        error={false}
        handleValue={buttonHandler}
        value={'Test'}
        />
      )

      await act(() => {
        wrapper.container.querySelector('button')?.click()
      }) 

      const list = wrapper.container.querySelector('ul')
      expect(list).toBeTruthy()
  })

  it('Display ArrowDownIcon when menu is Open', async () => {
    const wrapper = render(
      <BaseDropdownMenu 
        dropdownContent={dropdownContent} 
        error={false}
        handleValue={buttonHandler}
        value={'Test'}
        />
      )

      expect(wrapper.container.querySelector('[data-test="iconDown"]')).toBeTruthy()
  })

  it('Dispaly ArrowUpIcon when menu is Closed', async () => {
    const wrapper = render(
      <BaseDropdownMenu 
        dropdownContent={dropdownContent} 
        error={false}
        handleValue={buttonHandler}
        value={'Test'}
        />
      )
      
      // Trigger Menu Click
      await act(() => {
        wrapper.container.querySelector('button')?.click()
      })

      expect(wrapper.container.querySelector('[data-test="iconUp"]')).toBeTruthy()
  })

  it('Handle click on Menu Element', async () => {
    const wrapper = render(
      <BaseDropdownMenu 
        dropdownContent={dropdownContent} 
        error={false}
        handleValue={buttonHandler}
        value={'Test'}
        />
      )

    await act(() => {
      wrapper.container.querySelector('button')?.click()
    })
    await act(() => {
      wrapper.container.querySelectorAll('li')[0].click()
    })

    const list = wrapper.container.querySelector('ul')

    expect(buttonHandler).toHaveBeenCalled()
    expect(list).toBeFalsy()
  })
})