import { FC } from 'react'
import styles from './StatsList.module.scss'
import ProgressBar, { ProgressBarProps } from '../ProgressBar/ProgressBar'
import Typography from '../Typography'

export interface StatsListProps {
  list: Array<ProgressBarProps & { name: string }>
}

const StatsList: FC<StatsListProps> = ({ list }) => {
  return (
    <ul className={styles.container}>
      {list.map((stat) => (
        <li key={stat.name} className={styles.item} aria-label={stat.name}>
          <Typography variant="sm">{stat.name}</Typography>
          <ProgressBar value={stat.value} max={stat.max} />
        </li>
      ))}
    </ul>
  )
}

export default StatsList
