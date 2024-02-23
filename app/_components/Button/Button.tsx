import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

const Button: FC<ButtonProps> = ({ variant = 'primary', size = 'medium', ...props }) => {
  return (
    <button {...props} className={classNames([styles.container, styles[variant], styles[size], props.className])}>
      {props.children}
    </button>
  )
}

export default Button
