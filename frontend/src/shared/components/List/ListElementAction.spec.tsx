import { describe, it, expect, vi } from 'vitest'
import { render, act, screen } from '@testing-library/react'

import ListElementAction from './ListElementAction'

// Mock
const handleDeleteElementMock = vi.fn()
const handleDeleteModalMock = vi.fn()
const handleEditModalMock = vi.fn()

interface ElementTest {
  id: number | undefined,
  title: string
}

const wrapperMounter = ({ deleteModalOpen = false, editModalOpen = false}) => {
  return render(
    <ListElementAction<ElementTest>
      element={{id: 1, title: 'Hello'}}
      titleDeleteModal='Title Delete Modal'
      titleEditModal='Title Edit Modal'
      isDeleteModalOpen={deleteModalOpen}
      isEditModalOpen={editModalOpen}
      handleDeleteElement={handleDeleteElementMock}
      handleDeleteModal={handleDeleteModalMock}
      handleEditModal={handleEditModalMock}
      contentEditModal={<span data-test="contentModal">Hello</span>}
    />
  )
}

describe('ListElementAction > renders', () => {

  it('Should contains edit and delete Icon', async () => {
    const wrapper = wrapperMounter({ editModalOpen: true })

    const menuToggler = wrapper.container.querySelector('[data-test="drop-down-menu-toggler"]') as HTMLButtonElement

    await act(() => menuToggler.click())

    expect(wrapper.container.querySelector('[data-test="deleteIcon"]')).toBeTruthy()
    expect(wrapper.container.querySelector('[data-test="editIcon"]')).toBeTruthy()
  })
})

describe('ListElementAction > editAction', () => {
  it('Should contains edit modal', () => {
    const wrapper = wrapperMounter({ editModalOpen: true })

    expect(wrapper.container.querySelector('[data-test="deleteModal"]')).toBeFalsy()
    expect(wrapper.container.querySelector('[data-test="editModal"]')).toBeTruthy()
  })

  it('Should contains Edit Title Modal', () => {
    const wrapper = wrapperMounter({ editModalOpen: true })

    const h2 = wrapper.container.querySelector('h2')

    expect(h2?.textContent).toBe('Title Edit Modal')
  })

  it('Should Contains Content Edit Modal', () => {
    const wrapper = wrapperMounter({ editModalOpen: true })

    const editContentModal = wrapper.container.querySelector('[data-test="contentModal"]')

    expect(editContentModal?.textContent).toBe('Hello')
  })
})

describe('ListElementAction > deleteAction', () => {
  it('Should contains delete modal', () => {
    const wrapper = wrapperMounter({ deleteModalOpen: true })

    expect(wrapper.container.querySelector('[data-test="editModal"]')).toBeFalsy()
    expect(wrapper.container.querySelector('[data-test="deleteModal"]')).toBeTruthy()
  })

  it('Should Contains Delete Title Modal', () => {
    const wrapper = wrapperMounter({ deleteModalOpen: true })

    const h2 = wrapper.container.querySelector('h2')

    expect(h2?.textContent).toBe('Title Delete Modal')
  })

  it('Should Contains Actions Buttons', () => {
    const wrapper = wrapperMounter({ deleteModalOpen: true })

    expect(wrapper.container.querySelector('[data-test="confirmDeleteButton"]')).toBeTruthy()
    expect(wrapper.container.querySelector('[data-test="declineDeleteButton"]')).toBeTruthy()
  })

  it('Should Click Confirm Buttons', async () => {
    const wrapper = wrapperMounter({ deleteModalOpen: true })

    const button = wrapper.container.querySelector('[data-test="confirmDeleteButton"]') as HTMLButtonElement

    await act(() => {
      button.click()
    })

    expect(handleDeleteElementMock).toHaveBeenCalled()
  })

  it('Should Decline Button', async () => {
    const wrapper = wrapperMounter({ deleteModalOpen: true })

    const button = wrapper.container.querySelector('[data-test="declineDeleteButton"]') as HTMLButtonElement

    await act(() => {
      button.click()
    })

    expect(handleDeleteModalMock).toHaveBeenCalled()
  })
})
