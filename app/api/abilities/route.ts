import { ListItemDto } from "@/app/lib/types";
import { PokemonFilterParams } from "@/app/pokemons/PokemonListFilter/pokemonListFilter.utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get(PokemonFilterParams.Name);
  const abilities = searchParams.getAll("ids");
  const newParams = new URLSearchParams();
  if (name) {
    newParams.append(PokemonFilterParams.Name, name);
  }
  abilities.forEach((ability) => {
    newParams.append("ids[]", ability);
  });

  const url = new URL(`${process.env.API_ENDPOINT}/abilities`);
  url.search = searchParams.toString();
  const response = await fetch(url, {
    next: { revalidate: 1 }, // Revalidate every 60 seconds
  });
  const data = await response.json();
  return Response.json(data);
}
