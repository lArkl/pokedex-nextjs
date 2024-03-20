import { FC } from "react";
import styles from "./PokemonList.module.scss";
import PokemonListItem from "../PokemonListItem";
import { PokemonItemDto } from "@/app/lib/types";
import Typography from "@/app/_components/Typography";

interface PokemonListProps {
  pokemonList: PokemonItemDto[];
}

const PokemonList: FC<PokemonListProps> = ({ pokemonList }) => {
  return (
    <>
      {pokemonList.length ? (
        <section className={styles.list}>
          {pokemonList.map((pokemon) => (
            <PokemonListItem key={pokemon.id} pokemonInfo={pokemon} />
          ))}
        </section>
      ) : (
        <section className={styles.empty}>
          <Typography variant="md">No results...</Typography>
        </section>
      )}
    </>
  );
};

export default PokemonList;
