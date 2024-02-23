import { FC } from "react";
import styles from "./PokemonDetailAbout.module.scss";
import classNames from "classnames";
import Typography from "@/app/_components/Typography";
import { PokemonDto } from "@/app/lib/types";

interface PokemonDetailAboutProps {
  pokemonInfo: PokemonDto;
  className?: string;
}

const PokemonDetailAbout: FC<PokemonDetailAboutProps> = ({
  pokemonInfo,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)} aria-label="about">
      <Typography variant="lg" className={styles.title}>
        About
      </Typography>
      <div className={styles.main}>
        <div className={styles.info} aria-label="number">
          <Typography variant="md">Number</Typography>
          <Typography variant="sm">
            {pokemonInfo.id.toString().padStart(4, "0")}
          </Typography>
        </div>
        <div className={styles.info} aria-label="weight">
          <Typography variant="md">Weight</Typography>
          <Typography variant="sm">{pokemonInfo.weight} kg</Typography>
        </div>
        <div className={styles.info} aria-label="height">
          <Typography variant="md">Height</Typography>
          <Typography variant="sm">{pokemonInfo.height} m</Typography>
        </div>
        <div className={styles.info} aria-label="abilities">
          <Typography variant="md">Abilities</Typography>
          <ul className={styles.abilities}>
            {pokemonInfo.abilities.map((ability) => (
              <li key={`ability-${ability.id}`}>
                <Typography variant="sm">{ability.name}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailAbout;
