import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
  it('renders component', async () => {
    render(<Loader />)

    const loading = screen.getByRole('alert', { name: /loading/ })
    expect(loading).toBeInTheDocument()
  })
})
