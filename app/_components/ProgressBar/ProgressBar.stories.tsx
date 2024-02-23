import type { Meta, StoryObj } from '@storybook/react'

import ProgressBar from './ProgressBar'

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => <div style={{ width: '10rem' }}>{story()}</div>],
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 150,
    max: 255,
  },
}
