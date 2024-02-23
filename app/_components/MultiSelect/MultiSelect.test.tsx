import { render, screen } from '@testing-library/react'
import selectEvent from 'react-select-event'
import MultiSelect, { MultiSelectProps } from './MultiSelect'
import { vi } from 'vitest'
import { useForm } from 'react-hook-form'

const onSubmitMock = vi.fn()

const WrappedMultiSelect = ({ ...props }: Omit<MultiSelectProps<{ field: string }>, 'control' | 'name'> = {}) => {
  const { control } = useForm({ defaultValues: { field: [] } })
  return (
    <form onSubmit={onSubmitMock} data-testid="form">
      <label htmlFor="field">Field</label>
      <MultiSelect name="field" {...props} control={control} />
      <button>submit</button>
    </form>
  )
}

describe('MultiSelect', () => {
  it('renders component', () => {
    const { asFragment } = render(<WrappedMultiSelect />)

    expect(asFragment()).toMatchSnapshot()
  })
  it('has default label', async () => {
    render(<WrappedMultiSelect />)

    const multiselect = screen.getByLabelText(/field_multiselect/)
    expect(multiselect).toBeInTheDocument()
  })

  it('accepts a className', async () => {
    const { container } = render(<WrappedMultiSelect className="class" />)

    // Select doesn't accept a test id and doesn't move aria label
    expect(container.querySelector('form:nth-child(1)>:nth-child(2)')?.classList.contains('class')).toBeTruthy()
  })

  it('should update form value when selecting option', async () => {
    render(
      <WrappedMultiSelect
        options={[
          { label: 'Strawberry', value: 1 },
          { label: 'Mango', value: 2 },
          { label: 'Apple', value: 3 },
        ]}
      />,
    )

    expect(screen.getByTestId('form')).toHaveFormValues({ field: '' })

    await selectEvent.select(screen.getByLabelText('Field'), ['Strawberry', 'Mango'])

    expect(screen.getByTestId('form')).toHaveFormValues({ field: ['1', '2'] })
  })
})
