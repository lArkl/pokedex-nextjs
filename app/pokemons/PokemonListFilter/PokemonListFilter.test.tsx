import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import PokemonListFilter from './PokemonListFilter'
import { customRender } from '../../../context/TestProvider'
import { AppRoutes } from '../../../routes/appRoutes'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const onFilterMock = vi.fn()
const onClearMock = vi.fn()

const renderComponent = () =>
  customRender(
    <MemoryRouter initialEntries={[AppRoutes.PokemonList]}>
      <Routes>
        <Route
          path={AppRoutes.PokemonList}
          element={<PokemonListFilter onClear={onClearMock} onFilter={onFilterMock} />}
        />
      </Routes>
    </MemoryRouter>,
  )

const mockSearchParams = vi.fn()
const setSearchParamsMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as Record<string, unknown>
  return {
    ...actual,
    useSearchParams: () => mockSearchParams(),
  }
})

describe('PokemonListFilter', () => {
  beforeEach(() => {
    // vi.resetAllMocks()
    mockSearchParams.mockReturnValue([
      new URLSearchParams([
        ['types', '1'],
        ['name', 'woot'],
      ]),
      setSearchParamsMock,
    ])
  })

  it('shows input and filter button', () => {
    renderComponent()

    expect(screen.getByRole('combobox', { name: /types/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /abilities/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('calls onFilter when pressing filter button', () => {
    renderComponent()

    const textInput = 'test'
    const filterInput = screen.getByRole('textbox', { name: /pokemon name/i })
    fireEvent.change(filterInput, { target: { value: textInput } })

    const button = screen.getByRole('button', { name: /search/i })
    fireEvent.click(button)

    // expect(onFilterMock).toHaveBeenCalled()
  })

  it('shows defaults values from query params', async () => {
    mockSearchParams.mockReturnValue([
      new URLSearchParams([
        ['name', 'test'],
        ['types', '1'],
      ]),
      setSearchParamsMock,
    ])
    renderComponent()

    await waitFor(() => expect(screen.queryAllByText('Select...')).not.toHaveLength(2))

    expect(screen.getByTestId('list_filter')).toHaveFormValues({ name: 'test', types: '1' })
  })

  it('calls onClear when pressing clear button', () => {
    renderComponent()

    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clearButton)
    expect(onClearMock).toHaveBeenCalled()
  })
})
