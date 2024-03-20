import { FC } from "react";
import styles from "./PokemonDetailMain.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { PokemonDto } from "@/app/lib/types";
import Typography from "@/app/_components/Typography";
import { capitalize } from "@/app/lib/strings";
import PokemonTypeBadge from "@/app/_components/PokemonTypeBadge";

interface PokemonDetailMainProps {
  pokemonInfo: PokemonDto;
  className?: string;
}

const PokemonDetailMain: FC<PokemonDetailMainProps> = ({
  pokemonInfo,
  className,
}) => {
  return (
    <div
      className={classNames(styles.container, className)}
      data-testid="PokemonDetailMain"
    >
      <Typography variant="xl" className={styles.title}>
        {capitalize(pokemonInfo.name)}
      </Typography>
      <div
        className={styles.sprite}
        style={{ backgroundColor: `var(--color-${pokemonInfo.types[0].name})` }}
      >
        <Image
          src={pokemonInfo.spriteUrl ?? "/0.png"}
          alt={pokemonInfo.name}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.types} aria-label="types">
        {pokemonInfo.types.map((pokeType) => (
          <PokemonTypeBadge
            key={`type-${pokeType.id}`}
            typeName={pokeType.name}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonDetailMain;
