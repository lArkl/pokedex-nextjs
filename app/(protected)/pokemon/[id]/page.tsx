import styles from "./PokemonDetailPage.module.scss";
import PokemonDetailMain from "./PokemonDetailMain";
import PokemonDetailAbout from "./PokemonDetailAbout";
import PokemonDetailStats from "./PokemonDetailStats";
import PokemonDetailMoves from "./PokemonDetailMoves";
import PokemonDetailSprites from "./PokemonDetailSprites";
import { queryPokemonFromId } from "@/app/repository";

export default async function PokemonDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data: pokemonInfo } = await queryPokemonFromId(params.id);
  return (
    <main className={styles.details}>
      <PokemonDetailMain pokemonInfo={pokemonInfo} />
      <PokemonDetailAbout pokemonInfo={pokemonInfo} />
      <PokemonDetailStats pokemonInfo={pokemonInfo} />
      <PokemonDetailMoves pokemonInfo={pokemonInfo} />
      <PokemonDetailSprites pokemonInfo={pokemonInfo} />
    </main>
  );
}
