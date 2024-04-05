import {
  ListItemDto,
  Option,
  PaginatedResponseDto,
  PokemonFilterParams,
} from "@/app/lib/types";

export interface FilterFormProps {
  name: string;
  types: Option[];
  abilities: Option[];
}

export const formatFilterParams = (data: FilterFormProps): URLSearchParams => {
  const params = new URLSearchParams();
  if (data.name) {
    params.append(PokemonFilterParams.Name, data.name);
  }
  data.types.forEach((option) => {
    params.append(PokemonFilterParams.Types, option.value.toString());
  });
  data.abilities.forEach((option) => {
    params.append(PokemonFilterParams.Abilities, option.value.toString());
  });
  return params;
};

export const parseFilterParams = (searchParams: URLSearchParams) => {
  const abilitiesIds = searchParams
    .getAll(PokemonFilterParams.Abilities)
    .map((value) => parseInt(value));
  const typesIds = searchParams
    .getAll(PokemonFilterParams.Types)
    .map((value) => parseInt(value));
  return {
    typesIds,
    abilitiesIds,
    name: searchParams.get(PokemonFilterParams.Name) ?? "",
  };
};

export const getPokemonAbilities = async (
  params: Partial<{ name: string; ids: string[] }>
): Promise<PaginatedResponseDto<ListItemDto>> => {
  const url = new URL(`${process.env.NEXTAUTH_URL}/api/abilities`);
  const urlParams = new URLSearchParams();

  params.ids?.forEach((id) => {
    urlParams.append("ids[]", id);
  });
  if (params.name) {
    urlParams.append(PokemonFilterParams.Name, params.name);
  }

  url.search = urlParams.toString();

  const response = await fetch(url);
  return response.json();
};
