import { describe, it, expect, vi } from 'vitest'
import { render, act } from '@testing-library/react'

import DesktopNavigation from './DesktopNavigation'

import {
  AiOutlineHome,
} from 'react-icons/ai';

const navMock = [
  {
    icon: <AiOutlineHome className="text-white text-2xl" />,
    label: 'Home',
    path: '/dashboard'
  },
]

vi.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  }),
  Link: () => {}
}));

describe('DesktopNavigation > open', () => {
  it('Contains 200 width when Nav is Open', async () => {
    const wrapper = render(
      <DesktopNavigation 
        navData={navMock}
      />
    )
    
    const iconClose = wrapper.container.querySelector('[data-test="toggleButton"]') as HTMLButtonElement
    const navElement = wrapper.container.querySelector('nav')

    await act(() => {
      iconClose?.click()
    })

    expect(navElement?.className).contains('200px')
  })

  it('Contains Logo', async () => {
    const wrapper = render(
      <DesktopNavigation 
        navData={navMock}
      />
    )
    const toggleButton = wrapper.container.querySelector('[data-test="toggleButton"]') as HTMLButtonElement

    await act(() => {
      toggleButton?.click()
    })

    const logo = wrapper.container.querySelector('img')
    expect(logo).toBeTruthy()
  })

  it('Contains closed icon', async () => {
    const wrapper = render(
      <DesktopNavigation 
        navData={navMock}
      />
    )
    const toggleButton = wrapper.container.querySelector('[data-test="toggleButton"]') as HTMLButtonElement

    await act(() => {
      toggleButton?.click()
    })

    const iconClosed = wrapper.container.querySelector('[data-test="closedIcon"]')
    const iconOpen = wrapper.container.querySelector('[data-test="openIcon"]')

    expect(iconClosed).toBeTruthy()
    expect(iconOpen).toBeFalsy()
  })
})

describe('DesktopNavigation > closed', () => {
  it('Contains 60 width when Nav is Closed', () => {
    const wrapper = render(
      <DesktopNavigation 
        navData={navMock}
      />
    )

    const navElement = wrapper.container.querySelector('nav')

    expect(navElement?.className).contains('60px')
  })

  it('Do not contains Logo', async () => {
    const wrapper = render(
      <DesktopNavigation 
        navData={navMock}
      />
    )

    const logo = wrapper.container.querySelector('img')
    expect(logo).toBeFalsy()
  })

  it('Contains Open icon', async () => {
    const wrapper = render(
      <DesktopNavigation 
        navData={navMock}
      />
    )
    const iconClosed = wrapper.container.querySelector('[data-test="closedIcon"]')
    const iconOpen = wrapper.container.querySelector('[data-test="openIcon"]')

    expect(iconClosed).toBeFalsy()
    expect(iconOpen).toBeTruthy()
  })
})