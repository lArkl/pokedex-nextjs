import { render, screen } from '@testing-library/react'
import PokemonDetailMain from './PokemonDetailMain'
import { makePokemon } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailMain pokemonInfo={makePokemon()} className={className} />)
}

describe('PokemonDetailMain', () => {
  it('renders component', async () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getAllByTestId('PokemonTypeBadge')).toHaveLength(2)
  })

  it('accepts className', async () => {
    renderComponent('class')

    expect(screen.getByTestId('PokemonDetailMain')).toHaveClass('class')
  })
})
