"use server";

import { redirect } from "next/navigation";
import {
  ListItemDto,
  Option,
  PaginatedResponseDto,
  PokemonDto,
  PokemonFilterParams,
  PokemonItemDto,
  PokemonListParams,
  ResponseDto,
  UserDto,
} from "./types";
import { SignUpSchema } from "./validators";
import { createUser } from "../repository";

export async function signUpUser(
  data: SignUpSchema
): Promise<ResponseDto<UserDto>> {
  await createUser(data);
  redirect("/login");
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
    urlParams.set(PokemonFilterParams.Abilities, ability);
  });
  params.types?.forEach((type) => {
    urlParams.set(PokemonFilterParams.Types, type);
  });
  if (params.name) {
    urlParams.set(PokemonFilterParams.Name, params.name);
  }

  if (params.page) {
    urlParams.set("page", params.page);
  }
  const url = new URL(`${process.env.API_ENDPOINT}/pokemons`);
  url.search = urlParams.toString();

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`${process.env.API_ENDPOINT}/pokemon/${id}`);
  return response.json();
};
