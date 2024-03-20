import { getPokemonFromId } from "@/app/lib/actions";
import styles from "./PokemonDetailPage.module.scss";
import PokemonDetailMain from "./PokemonDetailMain";
import PokemonDetailAbout from "./PokemonDetailAbout";
import PokemonDetailStats from "./PokemonDetailStats";
import PokemonDetailMoves from "./PokemonDetailMoves";
import PokemonDetailSprites from "./PokemonDetailSprites";

export default async function PokemonDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data: pokemonInfo } = await getPokemonFromId(params.id);
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
