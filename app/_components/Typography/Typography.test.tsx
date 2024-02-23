import { render, screen } from '@testing-library/react'
import Typography from './typography'

describe('Typography', () => {
  it('renders component', async () => {
    const { asFragment } = render(<Typography>text</Typography>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('shows small size', async () => {
    render(<Typography variant="sm">text</Typography>)
    const text = screen.getByText('text')
    expect(text).toBeInTheDocument()
  })
  it('shows medium size', async () => {
    render(<Typography variant="md">text</Typography>)
    const text = screen.getByText('text')
    expect(text).toBeInTheDocument()
  })
  it('shows large size as heading', async () => {
    render(<Typography variant="lg">text</Typography>)
    const text = screen.getByRole('heading')
    expect(text).toHaveTextContent('text')
  })

  it('accepts classname', async () => {
    render(<Typography className="class">text</Typography>)
    const text = screen.getByText('text')
    expect(text).toHaveClass('class')
  })
})
