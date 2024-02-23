import { fireEvent, render, screen } from '@testing-library/react'
import Button from './Button'
import { vi } from 'vitest'

describe('Button', () => {
  it('renders component', async () => {
    const { asFragment } = render(<Button />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('shows inner text', async () => {
    render(<Button>Press</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Press')
  })

  it('accepts a className', async () => {
    render(<Button className="class" />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('class')
  })

  it('should fire on click', async () => {
    const onClickMock = vi.fn()
    render(<Button onClick={onClickMock} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalled()
  })
})
