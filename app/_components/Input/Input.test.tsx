import { fireEvent, render, screen } from '@testing-library/react'
import Input, { InputProps } from './Input'
import { useForm } from 'react-hook-form'

const WrappedInput = ({ defaultValue, ...props }: Omit<InputProps<{ field: string }>, 'control' | 'name'> = {}) => {
  const { control } = useForm({ defaultValues: { field: defaultValue } })
  return (
    <form data-testid="form">
      <Input name="field" {...props} control={control} />
      <button>submit</button>
    </form>
  )
}

describe('Input', () => {
  it('renders component', async () => {
    const { asFragment } = render(<WrappedInput />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('accepts a className', async () => {
    render(<WrappedInput className="class" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('class')
  })

  it('should update value when typing', async () => {
    render(<WrappedInput />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(input).toHaveValue('test')
  })

  it('should change value when typing', async () => {
    render(<WrappedInput />)
    expect(screen.getByTestId('form')).toHaveFormValues({ field: '' })

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(screen.getByTestId('form')).toHaveFormValues({ field: 'test' })
  })
})
