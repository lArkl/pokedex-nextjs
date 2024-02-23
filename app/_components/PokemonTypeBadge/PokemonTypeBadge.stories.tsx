import type { Meta, StoryObj } from '@storybook/react'

import PokemonTypeBadge from './PokemonTypeBadge'

const meta = {
  title: 'Molecules/PokemonTypeBadge',
  component: PokemonTypeBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PokemonTypeBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { typeName: 'grass' },
}
