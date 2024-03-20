import { render, screen, within } from '@testing-library/react'
import PokemonDetailAbout from './PokemonDetailAbout'
import { makePokemon } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailAbout pokemonInfo={makePokemon()} className={className} />)
}

describe('PokemonDetailAbout', () => {
  it('renders component', async () => {
    renderComponent()

    expect(screen.getByLabelText('about')).toBeInTheDocument()
    expect(screen.getByLabelText('number')).toHaveTextContent('0001')
    expect(screen.getByLabelText('weight')).toHaveTextContent(/6.9 kg/i)
    expect(screen.getByLabelText('height')).toHaveTextContent(/0.7 m/i)
  })

  it('shows abilities', async () => {
    renderComponent()

    const abilities = screen.getByLabelText('abilities')
    expect(within(abilities).getAllByRole('listitem')).toHaveLength(2)
  })

  it('accepts className', async () => {
    renderComponent('class')

    expect(screen.getByLabelText('about')).toHaveClass('class')
  })
})
