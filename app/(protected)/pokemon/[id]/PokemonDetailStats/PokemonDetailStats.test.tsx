import { render, screen, within } from '@testing-library/react'
import PokemonDetailStats from './PokemonDetailStats'
import { makePokemon } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailStats pokemonInfo={makePokemon()} className={className} />)
}

describe('PokemonDetailStats', () => {
  it('renders component', () => {
    renderComponent()

    expect(screen.getByLabelText('stats')).toBeInTheDocument()
  })

  it('shows list of stats', () => {
    renderComponent()

    const stats = screen.getByRole('list')
    expect(within(stats).getAllByRole('listitem')).toHaveLength(5)
  })

  it('shows hp stat', () => {
    renderComponent()

    const hp = screen.getByRole('listitem', { name: /hp/i })
    expect(within(hp).getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows attack stat', () => {
    renderComponent()

    const attack = screen.getByRole('listitem', { name: 'Attack' })
    expect(within(attack).getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows defense stat', () => {
    renderComponent()

    const defense = screen.getByRole('listitem', { name: /defense/i })
    expect(within(defense).getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows special attack stat', () => {
    renderComponent()

    const specialAttack = screen.getByRole('listitem', { name: /special attack/i })
    expect(within(specialAttack).getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows special defense stat', () => {
    renderComponent()

    const specialDefense = screen.getByRole('listitem', { name: /special defense/i })
    expect(within(specialDefense).getByRole('progressbar')).toBeInTheDocument()
  })

  it('accepts className', () => {
    renderComponent('class')

    expect(screen.getByLabelText('stats')).toHaveClass('class')
  })
})
