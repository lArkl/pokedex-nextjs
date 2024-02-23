import { render, screen, within } from '@testing-library/react'
import StatsList from './StatsList'

describe('StatsList', () => {
  it('renders component', async () => {
    render(<StatsList list={[{ name: 'hp', value: 25, max: 60 }]} />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  it('shows progress stats', async () => {
    render(
      <StatsList
        list={[
          { name: 'hp', value: 25, max: 60 },
          { name: 'speed', value: 5, max: 20 },
        ]}
      />,
    )

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)

    const firstItem = screen.getByRole('listitem', { name: /hp/i })
    expect(within(firstItem).getByRole('progressbar')).toBeInTheDocument()

    const secondItem = screen.getByRole('listitem', { name: /speed/i })
    expect(within(secondItem).getByRole('progressbar')).toBeInTheDocument()
  })
})
