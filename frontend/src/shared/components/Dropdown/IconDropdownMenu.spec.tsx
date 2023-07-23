import { createRef } from 'react'

import { render, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import IconDropdownMenu, { IIconDropdownMenuRef } from 'src/shared/components/Dropdown/IconDropdownMenu';
import { dropdownContent } from './mocks/mocks'

describe('IconDropdownMenu > handler', () => {
  it('Open Menu onClick', async () => {
    const wrapper = render(
      <IconDropdownMenu 
        dropdownContent={dropdownContent}
      />
    )

    await act(() => {
      wrapper.container.querySelector('button')?.click()
    })

    const list = wrapper.container.querySelector('ul')
    expect(list).toBeTruthy()
  })

  it('Close Menu onClick when event is called from parent by Ref', async () => {
    const ref = createRef<IIconDropdownMenuRef>()

    const wrapper = render(
      <IconDropdownMenu 
        ref={ref}
        dropdownContent={dropdownContent}
      />
    )
    await act(() => {
      wrapper.container.querySelector('button')?.click()
    })

    const listBefore = wrapper.container.querySelector('ul')
    expect(listBefore).toBeTruthy()

    await act(() => ref.current?.handleMenuOpen())

    const listAfter = wrapper.container.querySelector('ul')
    expect(listAfter).toBeFalsy()
  })
})