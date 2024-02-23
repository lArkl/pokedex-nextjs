import { FC } from "react";
import styles from "./PokemonDetailSprites.module.scss";
import Image from "next/image";
import Typography from "@/app/_components/Typography";
import { PokemonDto } from "@/app/lib/types";

interface PokemonDetailSpritesProps {
  pokemonInfo: PokemonDto;
  className?: string;
}

const PokemonDetailSprites: FC<PokemonDetailSpritesProps> = ({
  pokemonInfo,
  className,
}) => {
  return (
    <div aria-label="sprites" className={className}>
      <Typography variant="lg" className={styles.header}>
        Sprites
      </Typography>
      <div className={styles.list}>
        <div aria-label="default" className={styles.row}>
          <Typography variant="md">Default</Typography>
          <div className={styles.sprites}>
            <Image
              src={pokemonInfo.sprites.default.frontUrl}
              alt={`${pokemonInfo.name} default sprite front`}
              width={200}
              height={200}
            />
            <Image
              src={pokemonInfo.sprites.default.backUrl}
              alt={`${pokemonInfo.name} default sprite back`}
              width={200}
              height={200}
            />
          </div>
        </div>
        <div aria-label="shiny" className={styles.row}>
          <Typography variant="md">Shiny</Typography>
          <div className={styles.sprites}>
            <Image
              src={pokemonInfo.sprites.shiny.frontUrl}
              alt={`${pokemonInfo.name} shiny sprite front`}
              width={200}
              height={200}
            />
            <Image
              src={pokemonInfo.sprites.shiny.backUrl}
              alt={`${pokemonInfo.name} shiny sprite back`}
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailSprites;
