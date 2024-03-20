import styles from "./login.module.scss";
import Typography from "../_components/Typography";
import Loader from "../_components/Loader";
import Image from "next/image";
import LoginForm from "./login-form";
import { authConfig } from "../auth.config";
import { getServerSession } from "next-auth/next";
import Welcome from "./welcome";

export default async function Login() {
  const session = await getServerSession(authConfig);
  const username = session?.user?.name;
  return (
    <main className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Welcome to the Pokedex
      </Typography>
      <Loader className={styles.loader} />
      {username ? <Welcome username={username} /> : <LoginForm />}

      <div className={styles.powered}>
        <Typography variant="md">Powered by</Typography>
        <div className={styles.icons} aria-label="icons">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
          />
          <Image
            src="/react.svg"
            alt="React Logo"
            className={styles.reactIcon}
            width={50}
            height={50}
          />
        </div>
      </div>
    </main>
  );
}
