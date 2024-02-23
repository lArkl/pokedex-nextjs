import type { Meta, StoryObj } from '@storybook/react'

import Typography from './typography'

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: 'Text',
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'md',
  },
}

export const Small: Story = {
  args: {
    variant: 'sm',
  },
}

export const Large: Story = {
  args: {
    variant: 'lg',
  },
}
