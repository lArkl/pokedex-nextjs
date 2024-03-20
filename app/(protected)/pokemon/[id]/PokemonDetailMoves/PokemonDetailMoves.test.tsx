import { render, screen, within } from '@testing-library/react'
import PokemonDetailMoves from './PokemonDetailMoves'
import { makePokemon } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailMoves pokemonInfo={makePokemon()} className={className} />)
}

describe('PokemonDetailMoves', () => {
  it('renders component', async () => {
    renderComponent()

    expect(screen.getByLabelText('moves')).toBeInTheDocument()
  })

  it('shows list of moves', async () => {
    renderComponent()

    const moves = screen.getByRole('list')
    expect(within(moves).getAllByRole('listitem')).toHaveLength(2)
  })

  it('accepts className', async () => {
    renderComponent('class')

    expect(screen.getByLabelText('moves')).toHaveClass('class')
  })
})
