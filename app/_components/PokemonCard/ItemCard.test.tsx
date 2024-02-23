import { render, screen } from '@testing-library/react'
import ItemCard from './ItemCard'

describe('ItemCard', () => {
  it('renders component', async () => {
    render(<ItemCard title="test" id={1} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Test')
    expect(screen.getByRole('img', { name: /test/i })).toBeInTheDocument()
  })
})
