"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./login-form.module.scss";
import FormInput from "../_components/FormInput/FormInput";
import Button from "../_components/Button";
import Link from "next/link";
import { SignInSchema, signInSchema } from "../lib/validators";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm: FC = () => {
  const router = useRouter();
  const { control, handleSubmit, setError } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const action: () => void = handleSubmit(async (formData) => {
    const res = await signIn("credentials", { ...formData, redirect: false });
    if (res?.error) {
      const message =
        res.error === "CredentialsSignin"
          ? "Invalid credentials."
          : "Something went wrong.";
      setError("root", {
        type: "required",
        message,
      });
      toast(message, { type: "error" });
    } else {
      router.push("/pokemons");
      router.refresh();
    }
  });
  return (
    <form data-testid="signin" className={styles.container} onSubmit={action}>
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

export default LoginForm;
