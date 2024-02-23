import { screen, within } from '@testing-library/react'
import LoginPage from './LoginPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import userEvent from '@testing-library/user-event'
import { customRender } from '../../context/TestProvider'

const renderComponent = () => {
  return customRender(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={AppRoutes.PokemonList} element={<div>List</div>} />
        <Route path={AppRoutes.SignUp} element={<div>Sign Up</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'test-token')
  })
  afterAll(() => {
    window.localStorage.clear()
  })
  it('renders component', async () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
  it('shows message and icons', async () => {
    renderComponent()

    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument()

    const powered = screen.getByLabelText('icons')
    expect(within(powered).getAllByRole('img')).toHaveLength(2)
  })

  it('redirects to list when pressing search', async () => {
    renderComponent()

    const userWelcome = await screen.findByText('Good to see you again', { exact: false })
    expect(userWelcome).toBeInTheDocument()
    const searchLink = screen.getByRole('link', { name: /search/i })
    await userEvent.click(searchLink)

    expect(await screen.findByText('List')).toBeInTheDocument()
  })

  it('logs out user when already logged in', async () => {
    renderComponent()

    const userWelcome = await screen.findByText('Good to see you again', { exact: false })
    expect(userWelcome).toBeInTheDocument()
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    await userEvent.click(logoutButton)

    expect(await screen.findByText('Logged out')).toBeInTheDocument()
  })

  it('submits login successfully', async () => {
    const user = userEvent.setup()
    // Clear user token
    window.localStorage.clear()
    renderComponent()

    expect(await screen.findByTestId('signin')).toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    await user.clear(emailInput)
    await user.type(emailInput, 'a@a.com')

    const passwordInput = screen.getByLabelText('Password')
    await user.clear(passwordInput)
    await user.type(passwordInput, 'test_?1')

    const signInButton = screen.getByRole('button', { name: /sign in/i })
    await userEvent.click(signInButton)

    expect(await screen.findByText('Sign in successfully', { exact: false })).toBeInTheDocument()
  })

  it('redirects to create account', async () => {
    // Clear user token
    window.localStorage.clear()
    renderComponent()

    expect(await screen.findByTestId('signin')).toBeInTheDocument()

    const createAccountLink = screen.getByRole('link', { name: /create account/i })
    await userEvent.click(createAccountLink)

    expect(await screen.findByText('Sign up', { exact: false })).toBeInTheDocument()
  })
})
