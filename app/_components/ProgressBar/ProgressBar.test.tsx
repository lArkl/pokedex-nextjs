import { render } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders component', async () => {
    const { asFragment } = render(<ProgressBar value={0} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
