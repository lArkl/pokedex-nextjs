import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { getRequestError } from '../../utils/error'
// import { toast } from 'react-toastify'

import styles from "./SignInForm.module.scss";
// import { setUserToken } from '../../utils/auth'
import { signInUser } from "../lib/actions";
import { UserDto } from "../lib/types";
import FormInput from "../_components/FormInput/FormInput";
import Button from "../_components/Button";
import Link from "next/link";
import { SignInSchema, signInSchema } from "../lib/validators";

interface SignInFormProps {
  onSuccess: (user: UserDto) => void;
  onError?: (error: Error) => void;
}

const SignInForm: FC<SignInFormProps> = ({ onSuccess, onError }) => {
  const { control, handleSubmit, setError, reset } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  // const { mutate } = useMutation({
  //   mutationFn: (formData: SignInSchema) => {
  //     return signInUserRequest(formData)
  //   },
  // })
  const action: () => void = handleSubmit(async (data) => {
    try {
      signInUser(data);
      // toast('Sign in successfully!', { type: 'success' })
      // reset()
      // setUserToken(data.data.token)
      // onSuccess(data.data)
    } catch (err) {
      // toast(err.message, { type: 'error' })
    }
  });
  // const onSubmit = useCallback(
  //   (formFields: SignInSchema) => {
  // mutate(formFields, {
  //   onSuccess: ({ data }) => {
  // toast('Sign in successfully!', { type: 'success' })
  // reset()
  // setUserToken(data.data.token)
  // onSuccess(data.data)
  //   },
  //   onError: (error) => {
  //     const err = getRequestError(error)
  //     toast(err.message, { type: 'error' })
  //     setError('root', err)
  //     onError?.(err)
  //   },
  // })
  // },
  //   [mutate, onError, onSuccess, reset, setError],
  // )
  return (
    <form data-testid="signin" className={styles.container} action={action}>
      <div className={styles.fields}>
        <FormInput name="email" label="Email" control={control} />
        <FormInput
          name="password"
          label="Password"
          control={control}
          type="password"
        />
      </div>
      <div className={styles.buttons}>
        <Button variant="primary">Sign in</Button>
        <Link href="/sign-up">
          <Button variant="secondary" type="button">
            Create account
          </Button>
        </Link>
        <Link href="/pokemons">
          <Button variant="secondary" className={styles.search} type="button">
            Continue as Guest
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
