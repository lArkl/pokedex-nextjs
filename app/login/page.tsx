import { FC } from "react";
import styles from "./LoginPage.module.scss";
// import useUserQuery from '../../hooks/useUserQuery'
import Typography from "../_components/Typography";
import Link from "next/link";
import Loader from "../_components/Loader";
import Image from "next/image";
import Button from "../_components/Button";
import { getUserData } from "../lib/actions";
// import { AppRoutes } from '../../routes/appRoutes'

export default async function Login() {
  const userData = await getUserData();
  // const { isFetching, data: userData, logoutUser } = useUserQuery()
  return (
    <main className={styles.container}>
      <Typography variant="xl" className={styles.header}>
        Welcome to the Pokedex
      </Typography>
      <Loader className={styles.loader} />
      <div className={styles.welcome}>
        <Typography variant="md">
          Good to see you again {userData.firstname}!
        </Typography>
        <Link href="/pokemons">
          <Button variant="secondary" type="button">
            Search Pokemons
          </Button>
        </Link>
        <Button
          variant="secondary"
          type="button"
          className={styles.search}
          // onClick={() => {
          // logoutUser()
          // }}
        >
          Logout
        </Button>
      </div>

      {/* <SignInForm
            onSuccess={() => {
              navigate(AppRoutes.PokemonList)
            }}
          /> */}

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
