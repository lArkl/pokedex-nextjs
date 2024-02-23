import { fireEvent, render, screen, within } from '@testing-library/react'
import Paginator, { PaginatorProps } from './Paginator'
import { vi } from 'vitest'

const setCurrentPageMock = vi.fn()

const renderComponent = (props?: Partial<PaginatorProps>) =>
  render(<Paginator currentPage={1} totalCount={15} pageSize={5} setCurrentPage={setCurrentPageMock} {...props} />)

describe('Paginator', () => {
  it('renders component', async () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
  it('renders page items', async () => {
    renderComponent()

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('calls setCurrentPage', async () => {
    renderComponent()

    const pageItem = screen.getAllByRole('listitem')[2]
    const pageButton = within(pageItem).getByRole('button', { name: '2' })

    fireEvent.click(pageButton)

    expect(setCurrentPageMock).toHaveBeenCalledWith(2)
  })
})
