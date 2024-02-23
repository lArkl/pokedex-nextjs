import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import styles from './Typography.module.scss'

type TypographyVariant = 'sm' | 'md' | 'lg' | 'xl'

interface TypographyProps {
  children: ReactNode
  variant?: TypographyVariant
  className?: string
}

const typographyTypes: Record<
  TypographyVariant,
  { Component: FC<Omit<TypographyProps, 'variant'>>; className: string }
> = {
  xl: {
    Component: (props) => <h1 {...props} />,
    className: styles.xl,
  },
  lg: {
    Component: (props) => <h2 {...props} />,
    className: styles.lg,
  },
  md: {
    Component: (props) => <p {...props} />,
    className: styles.md,
  },
  sm: {
    Component: (props) => <p {...props} />,
    className: styles.sm,
  },
}

const Typography: FC<TypographyProps> = ({ children, variant = 'sm', className }) => {
  const { Component, className: typeClassName } = typographyTypes[variant]
  return <Component className={classNames([typeClassName, className])}>{children}</Component>
}

export default Typography
