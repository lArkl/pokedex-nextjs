import { render, screen } from '@testing-library/react'
import PokemonTypeBadge from './PokemonTypeBadge'

describe('PokemonTypeBadge', () => {
  it('renders component', async () => {
    render(<PokemonTypeBadge typeName="grass" />)

    expect(screen.getByText('Grass')).toBeInTheDocument()
  })

  it('accepts test id', async () => {
    render(<PokemonTypeBadge typeName="grass" testId="test" />)

    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  it('accepts a className', async () => {
    render(<PokemonTypeBadge typeName="grass" className="class" />)

    expect(screen.getByTestId('PokemonTypeBadge')).toHaveClass('class')
  })
})
