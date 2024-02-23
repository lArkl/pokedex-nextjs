import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'
import { useForm } from 'react-hook-form'
import { InputProps } from 'react-select'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    control: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>

export default meta
type BaseStory = StoryObj<typeof meta>
type Story = Omit<BaseStory, 'args'> & { args: Omit<BaseStory['args'], 'control' | 'name'> }

const Component = (args: Partial<InputProps>) => {
  const { control } = useForm({ defaultValues: { username: args.defaultValue ?? '' } })
  return <Input {...args} name="username" control={control} />
}

export const Default: Story = {
  render: (args) => <Component {...args} />,
  args: {},
}

export const DateType: Story = {
  render: (args) => <Component {...args} />,
  args: {
    type: 'date',
    value: '2023-03-02',
  },
}
