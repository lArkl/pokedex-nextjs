import type { Meta, StoryObj } from '@storybook/react'

import StatsList from './StatsList'

const meta = {
  title: 'Organisms/StatsList',
  component: StatsList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof StatsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    list: [
      { name: 'HP', value: 80 },
      { name: 'Speed', value: 25 },
    ],
  },
}
