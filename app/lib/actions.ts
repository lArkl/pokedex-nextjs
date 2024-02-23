"use server";

import { redirect, useSearchParams } from "next/navigation";
import {
  ListItemDto,
  Option,
  PaginatedResponseDto,
  PokemonDto,
  PokemonItemDto,
  PokemonListParams,
  ResponseDto,
  UserDto,
} from "./types";
import { PokemonFilterParams } from "../pokemons/PokemonListFilter/pokemonListFilter.utils";

export async function signUpUser(p: any) {
  // write something
  // redirect
}

export async function signInUser(params: {
  password: string;
  email: string;
}): Promise<UserDto & { token: string }> {
  // write something
  // axios.post<ResponseDto<UserDto & { token: string }>>(`${process.env.API_ENDPOINT}/users/signin`, fields)
  const response = await fetch(`${process.env.API_ENDPOINT}/users/signin`, {
    body: JSON.stringify(params),
    cache: "no-cache",
  });
  return response.json();
  // redirect
}

export async function getUserData(): Promise<UserDto> {
  return {
    firstname: "first",
    lastname: "last",
    id: 1,
    updatedAt: "",
  };
}

export async function getPokemonTypes(): Promise<Option[]> {
  const response = await fetch(`${process.env.API_ENDPOINT}/types`);
  const obj = await response.json();
  return obj.data.map(({ name, id }: ListItemDto) => ({
    label: name,
    value: id,
  }));
}

export async function getPokemonsList(
  params: PokemonListParams = {}
): Promise<PaginatedResponseDto<PokemonItemDto>> {
  const urlParams = new URLSearchParams();
  urlParams.append("pageSize", process.env.PAGE_SIZE ?? "");

  params.abilities?.forEach((ability) => {
    urlParams.set(PokemonFilterParams.Abilities + "[]", ability);
  });
  params.types?.forEach((type) => {
    urlParams.set(PokemonFilterParams.Types + "[]", type);
  });
  if (params.name) {
    urlParams.set(PokemonFilterParams.Name, params.name);
  }

  const url = new URL(`${process.env.API_ENDPOINT}/pokemons`);
  url.search = urlParams.toString();
  console.log(url.search);
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.log(err);
    // if (err instanceof AxiosError && err.code === 'ERR_CANCELED') {
    //   return { data: { items: [], page: 1, count: 0, pageSize }, error: null }
    // }
    throw err;
  }
}

export const getPokemonFromId = async (
  id: string
): Promise<ResponseDto<PokemonDto>> => {
  const response = await fetch(`${process.env.API_ENDPOINT}/pokemon/${id}`);
  return response.json();
};
