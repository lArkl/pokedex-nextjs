import { InputHTMLAttributes } from 'react'
import styles from './FormInput.module.scss'
import { Control, FieldValues, useController, FieldPath, UseControllerProps } from 'react-hook-form'
import classNames from 'classnames'
import Fieldset from '../Fieldset'
import Typography from '../Typography'

export type FormInputProps<TFieldValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  rules?: UseControllerProps['rules']
}

export default function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  label,
  ...props
}: FormInputProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    control,
    name,
    rules,
  })
  return (
    <Fieldset name={name} label={label} className={styles.container}>
      <input {...props} id={name} {...field} className={props.className} />
      {error ? (
        <Typography className={styles.error} variant="sm">
          {error.message}
        </Typography>
      ) : (
        <div className={styles.default}></div>
      )}
    </Fieldset>
  )
}
