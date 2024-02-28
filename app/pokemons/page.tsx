import styles from "./PokemonListPage.module.scss";
import Paginator from "../_components/Paginator";
import PokemonListFilter from "./PokemonListFilter";
import PokemonList from "./PokemonList";
import { getPokemonTypes, getPokemonsList } from "../lib/actions";
import { PokemonListParams } from "../lib/types";
import { PokemonFilterParams } from "./PokemonListFilter/pokemonListFilter.utils";

export default async function PokemonListPage({
  searchParams,
}: {
  searchParams?: PokemonListParams & {
    [PokemonFilterParams.Abilities]: string[];
    [PokemonFilterParams.Types]: string[];
  };
}) {
  const abilities: string[] = [];
  if (searchParams?.[PokemonFilterParams.Abilities]) {
    const tempAbilities = searchParams[PokemonFilterParams.Abilities];
    if (Array.isArray(tempAbilities)) {
      tempAbilities.forEach((ability) => {
        abilities.push(ability);
      });
    } else {
      abilities.push(tempAbilities);
    }
  }

  const types: string[] = [];
  if (searchParams?.[PokemonFilterParams.Types]) {
    const tempTypes = searchParams[PokemonFilterParams.Types];
    if (Array.isArray(tempTypes)) {
      tempTypes.forEach((type) => {
        types.push(type);
      });
    } else {
      types.push(tempTypes);
    }
  }

  const pokemonsData = await getPokemonsList({
    ...searchParams,
    abilities,
    types,
  });
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
