export interface ResponseDto<T> {
  data: T;
  error: null | { message: string; code: number };
}

export interface PaginationDto<T> {
  items: T[];
  count: number;
  page: number;
  pageSize: number;
}

export type PaginatedResponseDto<T> = ResponseDto<PaginationDto<T>>;

export interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  moves: ListItemDto[];
  abilities: ListItemDto[];
  types: ListItemDto[];
  spriteUrl: string;
  stats: StatsDto;
  sprites: {
    default: SpriteDto;
    shiny: SpriteDto;
  };
}

export interface ListItemDto {
  id: number;
  name: string;
}

export interface SpriteDto {
  backUrl: string;
  frontUrl: string;
}

export interface StatsDto {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonItemDto {
  id: number;
  name: string;
  spriteUrl: string;
  types: Array<{
    id: number;
    name: string;
  }>;
}

export interface UserDto {
  firstname: string;
  lastname: string;
  id: number;
  updatedAt: string;
}

export type PokemonListParams = {
  page?: string;
  name?: string;
  types?: string[];
  abilities?: string[];
};

export interface Option {
  label: string;
  value: number;
}
