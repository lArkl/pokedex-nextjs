import { FC } from "react";
import styles from "./PokemonListItem.module.scss";
import { PokemonItemDto } from "@/app/lib/types";
import Link from "next/link";
import ItemCard from "@/app/_components/PokemonCard/ItemCard";
import PokemonTypeBadge from "@/app/_components/PokemonTypeBadge";

interface PokemonListItemProps {
  pokemonInfo: PokemonItemDto;
}

const PokemonListItem: FC<PokemonListItemProps> = ({ pokemonInfo }) => {
  return (
    <Link
      href={`/pokemon/${pokemonInfo.id.toString()}`}
      className={styles.link}
    >
      <ItemCard
        title={pokemonInfo.name}
        id={pokemonInfo.id}
        imgUrl={pokemonInfo.spriteUrl ?? process.env.DEFAULT_SPRITE}
      >
        {pokemonInfo.types.map((pokemonType) => (
          <PokemonTypeBadge typeName={pokemonType.name} key={pokemonType.id} />
        ))}
      </ItemCard>
    </Link>
  );
};

export default PokemonListItem;
