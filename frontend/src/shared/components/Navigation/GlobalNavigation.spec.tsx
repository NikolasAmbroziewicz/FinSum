import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

import GlobalNavigation from './GlobalNavigation'

vi.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  }),
  Link: () => {}
}));


describe('GlobalNavigation > render', () => {
  it('Render MobileNavigation', () => {
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 580})
    const wrapper = render(
      <GlobalNavigation />
    )

    const mobileNav = wrapper.container.querySelector('[data-test="mobileNavigation"]') 

    expect(mobileNav).toBeTruthy()
  })

  it('Render DesktopNavigation', () => {
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 800})
    const wrapper = render(
      <GlobalNavigation />
    )

    const mobileNav = wrapper.container.querySelector('[data-test="desktopNavigation"]') 

    expect(mobileNav).toBeTruthy()
  })
})