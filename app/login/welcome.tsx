"use client";

import { FC } from "react";
import Typography from "../_components/Typography";
import Link from "next/link";
import Button from "../_components/Button";
import { signOut } from "next-auth/react";
import styles from "./welcome.module.scss";

const Welcome: FC<{ username: string }> = ({ username }) => {
  return (
    <div className={styles.welcome}>
      <Typography variant="md">Good to see you again {username}!</Typography>
      <Link href="/pokemons">
        <Button variant="secondary" type="button">
          Search Pokemons
        </Button>
      </Link>
      <Button
        variant="secondary"
        type="button"
        className={styles.search}
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Welcome;
