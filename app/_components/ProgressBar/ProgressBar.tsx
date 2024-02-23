import { FC } from 'react'
import styles from './ProgressBar.module.scss'

export interface ProgressBarProps {
  value: number
  max?: number
}

const ProgressBar: FC<ProgressBarProps> = ({ value, max = 100 }) => {
  const width = `${Math.floor((value / max) * 100)}%`
  return (
    <div className={styles.container} role="progressbar">
      <div className={styles.bar} style={{ width }}>
        <div className={styles.value}></div>
      </div>
    </div>
  )
}

export default ProgressBar
