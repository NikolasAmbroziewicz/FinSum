import {describe, it, expect, vi} from 'vitest'
import { render, act } from '@testing-library/react'

import MobileNavigation from './MobileNavigation'

import {
  AiOutlineHome,
} from 'react-icons/ai';

vi.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  }),
  Link: () => {}
}));

const navMock = [
  {
    icon: <AiOutlineHome className="text-white text-2xl" />,
    label: 'Home',
    path: '/dashboard'
  },
]

describe('MobileNavigation > closed', () => {
  it('Contains closed styles', () => {
    const wrapper = render(
      <MobileNavigation 
        navData={navMock}
      />
    )

    const menuWrapper = wrapper.container.querySelector('[data-test="menuWrapper"]')
    const navList = wrapper.container.querySelector('[data-test="navList"]')

    expect(menuWrapper?.className).contains('w-0')
    expect(navList?.className).contains('w-0')
  })
})

describe('MobileNavigation > open', () => {
  it('Contains open Styles', async () => {
    const wrapper = render(
      <MobileNavigation 
        navData={navMock}
      />
    )

    const iconOpen = wrapper.container.querySelector('[data-test="iconOpen"]') as HTMLButtonElement

    await act(() => {
      iconOpen.click()
    })

    const menuWrapper = wrapper.container.querySelector('[data-test="menuWrapper"]')
    const navList = wrapper.container.querySelector('[data-test="navList"]')

    expect(menuWrapper?.className).contains('w-screen')
    expect(navList?.className).contains('w-2/3')
  })
})