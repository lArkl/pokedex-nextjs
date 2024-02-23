"use client";
// import { FC } from 'react'
import styles from "./SignUpPage.module.scss";
// import Button from '../../components/Button'
// import { useForm } from 'react-hook-form'
// import { useMutation } from '@tanstack/react-query'
// import { signUpUserRequest } from '../../requests/user.requests'
// import { isAxiosError } from 'axios'
import Link from "next/link";
import Button from "../_components/Button";
import FormInput from "../_components/FormInput/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";
import { signUpUser } from "../lib/actions";
import { SignUpSchema, signUpSchema } from "../lib/validators";

const SignUpForm: FC = () => {
  const { control, handleSubmit, setError, reset } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const action: () => void = handleSubmit(async (data) => {
    try {
      // toast('Account created successfully!', { type: 'success' })
      // reset()
      signUpUser(data);
    } catch (err) {
      // toast(err.message, { type: 'error' })
      //       if (isAxiosError(error)) {
      //         const e = error.response?.data.error as { message: string; code: number }
      //         setError('root', e)
      //         toast(e.message, { type: 'error' })
      //       }
    }
  });

  return (
    <form data-testid="signup" className={styles.form} action={action}>
      <div className={styles.fields}>
        <FormInput name="email" label="Email" control={control} />
        <FormInput name="firstname" label="First Name" control={control} />
        <FormInput name="lastname" label="Last Name" control={control} />
        <FormInput
          name="password"
          label="Password"
          control={control}
          type="password"
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          control={control}
          type="password"
        />
      </div>
      <div className={styles.buttons}>
        <Button variant="primary">Sign up</Button>
        <Link href="/pokemons">
          <Button variant="secondary" type="button">
            Continue as Guest
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
