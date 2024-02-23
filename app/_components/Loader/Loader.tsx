import { FC } from 'react'
import styles from './Loader.module.scss'
import classNames from 'classnames'

const Loader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={styles.container} role="alert" aria-label="loading">
      <div className={classNames(styles.pokeball, className)}></div>
    </div>
  )
}

export default Loader
