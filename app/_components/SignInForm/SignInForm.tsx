import { FC, useCallback } from 'react'
import FormInput from '../FormInput/FormInput'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signInUserRequest } from '../../requests/user.requests'
import { getRequestError } from '../../utils/error'
import { toast } from 'react-toastify'

import styles from './SignInForm.module.scss'
import Button from '../Button'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../routes/appRoutes'
import { UserDto } from '../../requests/dto'
import { setUserToken } from '../../utils/auth'

const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be atleast 6 characters' }),
})

type SignInSchema = z.infer<typeof signInSchema>

interface SignInFormProps {
  onSuccess: (user: UserDto) => void
  onError?: (error: Error) => void
}

const SignInForm: FC<SignInFormProps> = ({ onSuccess, onError }) => {
  const { control, handleSubmit, setError, reset } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })
  const { mutate } = useMutation({
    mutationFn: (formData: SignInSchema) => {
      return signInUserRequest(formData)
    },
  })

  const onSubmit = useCallback(
    (formFields: SignInSchema) => {
      mutate(formFields, {
        onSuccess: ({ data }) => {
          toast('Sign in successfully!', { type: 'success' })
          reset()
          setUserToken(data.data.token)
          onSuccess(data.data)
        },
        onError: (error) => {
          const err = getRequestError(error)
          toast(err.message, { type: 'error' })
          setError('root', err)
          onError?.(err)
        },
      })
    },
    [mutate, onError, onSuccess, reset, setError],
  )
  return (
    <form data-testid="signin" className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <FormInput name="email" label="Email" control={control} />
        <FormInput name="password" label="Password" control={control} type="password" />
      </div>
      <div className={styles.buttons}>
        <Button variant="primary">Sign in</Button>
        <Link to={AppRoutes.SignUp}>
          <Button variant="secondary" type="button">
            Create account
          </Button>
        </Link>
        <Link to={AppRoutes.PokemonList}>
          <Button variant="secondary" className={styles.search} type="button">
            Continue as Guest
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default SignInForm
