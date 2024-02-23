import { render, screen } from '@testing-library/react'
import Fieldset from './Fieldset'

describe('Fieldset', () => {
  it('renders component', async () => {
    const { asFragment } = render(<Fieldset name="field">Form field set</Fieldset>)

    expect(asFragment()).toMatchSnapshot()
  })
  it('shows label', async () => {
    render(
      <Fieldset name="field">
        <input id="field" />
      </Fieldset>,
    )

    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByLabelText(/field/)).toBeInTheDocument()
  })

  it('accepts a className', async () => {
    render(
      <Fieldset className="class" name="field">
        form value
      </Fieldset>,
    )

    expect(screen.getByRole('group')).toHaveClass('class')
  })
})
