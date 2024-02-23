import { screen } from '@testing-library/react'
import SignUpPage from './page'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import { customRender } from '../../context/TestProvider'
import userEvent from '@testing-library/user-event'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={[AppRoutes.SignUp]}>
      <Routes>
        <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
        <Route path={AppRoutes.Login} element={<div>Login</div>} />
        <Route path={AppRoutes.PokemonList} element={<div>List</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SignUpPage', () => {
  it('renders component', async () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
  it('shows form', async () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /create your pokemon user account/i })).toBeInTheDocument()
    expect(screen.getByTestId('signup')).toBeInTheDocument()
  })

  it('submits new account data', async () => {
    const user = userEvent.setup()
    renderComponent()

    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    await user.clear(emailInput)
    await user.type(emailInput, 'a@a.com')

    const firstNameInput = screen.getByRole('textbox', { name: 'First Name' })
    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'jose')

    const lastNameInput = screen.getByRole('textbox', { name: 'Last Name' })
    await user.clear(lastNameInput)
    await user.type(lastNameInput, 'garcia')

    const passwordInput = screen.getByLabelText('Password')
    await user.clear(passwordInput)
    await user.type(passwordInput, 'test_?1')

    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    await user.clear(confirmPasswordInput)
    await user.type(confirmPasswordInput, 'test_?1')

    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(await screen.findByText('Login')).toBeInTheDocument()
  })

  it('redirects to list when pressing search', async () => {
    renderComponent()

    const continueLink = screen.getByRole('link')
    expect(continueLink).toHaveTextContent(/continue as guest/i)
    await userEvent.click(continueLink)

    expect(await screen.findByText('List')).toBeInTheDocument()
  })
})
