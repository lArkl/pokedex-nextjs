import type { Meta, StoryObj } from '@storybook/react'

import ItemCard from './ItemCard'
import Button from '../Button'

const meta = {
  title: 'Organisms/ItemCard',
  component: ItemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'pokemon 1',
    id: 1,
    imgUrl: 'https://static.pokemonpets.com/images/monsters-images-300-300/2011-Shiny-Metapod.webp',
  },
} satisfies Meta<typeof ItemCard>

export default meta

type BaseStory = StoryObj<typeof meta>
type Story = Omit<BaseStory, 'args'> & { args: Omit<BaseStory['args'], 'setCurrentPage' | 'currentPage'> }

export const Default: Story = {
  args: {},
}

export const WithBottom: Story = {
  args: {
    children: <Button>Go</Button>,
  },
}
