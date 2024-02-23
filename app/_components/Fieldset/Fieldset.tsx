import { FC, ReactNode } from 'react'
import Typography from '../Typography'
import classNames from 'classnames'
import styles from './Fieldset.module.scss'

export interface FieldsetProps {
  label?: string
  name: string
  className?: string
  textClassName?: string
  children: ReactNode
}

const Fieldset: FC<FieldsetProps> = ({ label, name, className, textClassName, children }) => {
  return (
    <fieldset className={classNames(styles.container, className)}>
      <label htmlFor={name}>
        <Typography className={classNames(styles.text, textClassName)} variant="md">
          {label ?? name}
        </Typography>
      </label>
      {children}
    </fieldset>
  )
}

export default Fieldset
