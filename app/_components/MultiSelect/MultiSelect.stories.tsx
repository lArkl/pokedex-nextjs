import type { Meta, StoryObj } from '@storybook/react'

import MultiSelect, { MultiSelectProps } from './MultiSelect'
import { FieldValues, useForm } from 'react-hook-form'

const meta = {
  title: 'Atoms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    control: {
      control: false,
    },
  },
} satisfies Meta<typeof MultiSelect>

export default meta
type BaseStory = StoryObj<typeof meta>
type Story = Omit<BaseStory, 'args'> & { args: Omit<BaseStory['args'], 'control' | 'name'> }

const Component = (args: Pick<MultiSelectProps<FieldValues>, 'options'>) => {
  const { control } = useForm({ defaultValues: { option: '' } })
  return <MultiSelect name="option" control={control} options={args.options} />
}

export const Default: Story = {
  args: {
    options: [
      { label: 'option 1', value: 1 },
      { label: 'option 2', value: 2 },
      { label: 'option 3', value: 3 },
    ],
  },
  render: (args) => <Component options={args.options} />,
}
