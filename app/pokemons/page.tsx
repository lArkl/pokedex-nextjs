import styles from "./PokemonListPage.module.scss";
import Paginator from "../_components/Paginator";
import PokemonListFilter from "./PokemonListFilter";
import PokemonList from "./PokemonList";
import { getPokemonTypes, getPokemonsList } from "../lib/actions";
import { PokemonListParams } from "../lib/types";

export default async function PokemonListPage({
  searchParams,
}: {
  searchParams?: PokemonListParams;
}) {
  const pokemonsData = await getPokemonsList(searchParams);
  const pokemonTypes = await getPokemonTypes();

  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const currentPage = isNaN(page) ? 1 : page;

  return (
    <main className={styles.container}>
      <PokemonListFilter pokemonTypes={pokemonTypes} />
      <PokemonList pokemonList={pokemonsData.data.items} />
      <Paginator
        currentPage={currentPage}
        totalCount={pokemonsData.data.count}
        pageSize={Number(process.env.PAGE_SIZE)}
      />
    </main>
  );
}
