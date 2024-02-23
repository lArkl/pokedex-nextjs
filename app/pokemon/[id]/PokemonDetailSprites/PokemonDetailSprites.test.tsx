import { render, screen, within } from '@testing-library/react'
import PokemonDetailSprites from './PokemonDetailSprites'
import { makePokemon } from '../../../mocks/factories/pokemon'

const renderComponent = (className?: string) => {
  render(<PokemonDetailSprites pokemonInfo={makePokemon()} className={className} />)
}

describe('PokemonDetailSprites', () => {
  it('renders component', async () => {
    renderComponent()

    expect(screen.getByLabelText('sprites')).toBeInTheDocument()
  })

  it('shows default sprites', async () => {
    renderComponent()

    const defaultSprites = screen.getByLabelText('default')
    expect(within(defaultSprites).getAllByRole('img')).toHaveLength(2)
  })

  it('shows shiny sprites', async () => {
    renderComponent()

    const shinySprites = screen.getByLabelText('shiny')
    expect(within(shinySprites).getAllByRole('img')).toHaveLength(2)
  })

  it('accepts className', async () => {
    renderComponent('class')

    expect(screen.getByLabelText('sprites')).toHaveClass('class')
  })
})
