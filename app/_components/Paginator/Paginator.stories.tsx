import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Paginator, { PaginatorProps } from './Paginator'
import { useState } from 'react'

const meta = {
  title: 'Molecules/Paginator',
  component: Paginator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    setCurrentPage: {
      control: false,
    },
    currentPage: {
      control: false,
    },
  },
} satisfies Meta<typeof Paginator>

export default meta

const Component = ({ pageSize, totalCount }: Pick<PaginatorProps, 'pageSize' | 'totalCount'>) => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Paginator
      currentPage={currentPage}
      pageSize={pageSize}
      totalCount={totalCount}
      setCurrentPage={(page) => {
        action('setCurrentPage')(page)
        setCurrentPage(page)
      }}
    />
  )
}

type BaseStory = StoryObj<typeof meta>
type Story = Omit<BaseStory, 'args'> & { args: Omit<BaseStory['args'], 'setCurrentPage' | 'currentPage'> }

export const Default: Story = {
  args: { pageSize: 1, totalCount: 10 },
  render: (args) => <Component pageSize={args.pageSize} totalCount={args.totalCount} />,
}
