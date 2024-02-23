import { render, screen } from '@testing-library/react'
import PokemonList from './PokemonList'
import { makePokemonList } from '../../../mocks/factories/pokemonList'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../../routes/appRoutes'
import { PokemonItemDto } from '../../../requests/dto'

const renderComponent = (pokemonList: PokemonItemDto[]) => {
  return render(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route path={AppRoutes.PokemonList} element={<PokemonList pokemonList={pokemonList} />} />
        <Route path={AppRoutes.PokemonDetail} element={<div>Detail</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PokemonList', () => {
  it('shows pokemon list', () => {
    renderComponent(makePokemonList(2).items)

    expect(screen.getAllByRole('heading', { name: /bulbasaur/i }).length).toBeGreaterThan(0)
  })
  it('shows no results when empty list', () => {
    renderComponent([])

    expect(screen.getByText(/no result/i)).toBeInTheDocument()
  })
})
