import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import { Control, FieldValues, useController, FieldPath, UseControllerProps } from 'react-hook-form'
import classNames from 'classnames'

export type InputProps<TFieldValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  rules?: UseControllerProps['rules']
}

export default function Input<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: InputProps<TFieldValues>) {
  const { field } = useController<TFieldValues>({
    control,
    name,
    rules,
  })
  return <input {...props} id={name} {...field} className={classNames([styles.container, props.className])} />
}
