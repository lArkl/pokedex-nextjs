import * as schema from "../database/schema";
import {
  ListItemDto,
  PaginatedResponseDto,
  PokemonDto,
  PokemonItemDto,
  PokemonListParams,
  ResponseDto,
} from "../lib/types";
import { countDistinct, eq, inArray } from "drizzle-orm";
import { parseNumber, getPageParams, SpriteCategory } from "./utils";
import db from "../database/db";

export async function queryPokemonsList(
  params: PokemonListParams = {}
): Promise<PaginatedResponseDto<PokemonItemDto>> {
  const { page, offset, pageSize } = getPageParams(params.page);
  const abilities = params.abilities?.map((a) => parseNumber(a));
  const types = params.types?.map((t) => parseNumber(t));

  let countQuery: any = db
    .select({
      total: countDistinct(schema.pokemons.id),
    })
    .from(schema.pokemons)
    .leftJoin(
      schema.pokemonToTypes,
      eq(schema.pokemonToTypes.pokemonId, schema.pokemons.id)
    );

  let idsQuery: any = db
    .selectDistinct({
      id: schema.pokemonToTypes.pokemonId,
    })
    .from(schema.pokemons)
    .leftJoin(
      schema.pokemonToTypes,
      eq(schema.pokemonToTypes.pokemonId, schema.pokemons.id)
    )
    .orderBy((t) => t.id);

  if (abilities?.length) {
    countQuery = countQuery
      .leftJoin(
        schema.pokemonToAbilities,
        eq(schema.pokemonToAbilities.pokemonId, schema.pokemons.id)
      )
      .where(inArray(schema.pokemonToAbilities.pokemonAbilityId, abilities));
    idsQuery = idsQuery
      .leftJoin(
        schema.pokemonToAbilities,
        eq(schema.pokemonToAbilities.pokemonId, schema.pokemons.id)
      )
      .where(inArray(schema.pokemonToAbilities.pokemonAbilityId, abilities));
  }
  if (types?.length) {
    countQuery = countQuery.where(
      inArray(schema.pokemonToTypes.pokemonTypeId, types)
    );
    idsQuery = idsQuery.where(
      inArray(schema.pokemonToTypes.pokemonTypeId, types)
    );
  }
  const countResult: Array<{ total: number }> = await countQuery;
  const idsResult: Array<{
    id: number | null;
  }> = await idsQuery.limit(pageSize).offset(offset);

  const ids = idsResult.flatMap((res) => res.id ?? []);

  const recordResult = await db
    .select({
      id: schema.pokemonToTypes.pokemonId,
      name: schema.pokemons.name,
      spriteUrl: schema.pokemons.mainSprite,
      typeId: schema.pokemonToTypes.pokemonTypeId,
      typeName: schema.types.name,
    })
    .from(schema.pokemons)
    .leftJoin(
      schema.pokemonToTypes,
      eq(schema.pokemonToTypes.pokemonId, schema.pokemons.id)
    )
    .leftJoin(
      schema.types,
      eq(schema.pokemonToTypes.pokemonTypeId, schema.types.id)
    )
    .where(inArray(schema.pokemons.id, ids));

  const pokemonRecords: Record<number, PokemonItemDto> = {};

  recordResult.forEach((r) => {
    const id = r.id ?? 0;
    if (!pokemonRecords[id]) {
      pokemonRecords[id] = {
        id,
        name: r.name,
        spriteUrl: r.spriteUrl ?? "",
        types: [],
      };
    }
    pokemonRecords[id].types.push({
      id: r.typeId ?? 0,
      name: r.typeName ?? "",
    });
  });

  return {
    data: {
      items: Object.values(pokemonRecords),
      count: countResult[0].total,
      page,
      pageSize,
    },
    error: null,
  };
}

export const queryPokemonFromId = async (
  id: string
): Promise<ResponseDto<PokemonDto>> => {
  const pokemonId = parseNumber(id);
  const pokemonQuery = db
    .select()
    .from(schema.pokemons)
    .leftJoin(
      schema.pokemonToTypes,
      eq(schema.pokemonToTypes.pokemonId, schema.pokemons.id)
    )
    .leftJoin(
      schema.types,
      eq(schema.types.id, schema.pokemonToTypes.pokemonTypeId)
    )
    .leftJoin(
      schema.pokemonToMoves,
      eq(schema.pokemonToMoves.pokemonId, schema.pokemons.id)
    )
    .leftJoin(
      schema.moves,
      eq(schema.moves.id, schema.pokemonToMoves.pokemonMoveId)
    )
    .leftJoin(
      schema.pokemonToAbilities,
      eq(schema.pokemonToAbilities.pokemonId, schema.pokemons.id)
    )
    .leftJoin(
      schema.abilities,
      eq(schema.abilities.id, schema.pokemonToAbilities.pokemonAbilityId)
    )
    .where(eq(schema.pokemons.id, pokemonId));

  const spriteQuery = db
    .select()
    .from(schema.sprites)
    .where(eq(schema.sprites.pokemonId, pokemonId));

  const [spriteResult, pokemonResult] = await Promise.all([
    spriteQuery,
    pokemonQuery,
  ]);

  if (!pokemonResult.length) {
    throw Error("Pokemon not found!");
  }

  const {
    mainSprite,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    ...extraFields
  } = pokemonResult[0].pokemon;

  const idsToMoves: Record<number, ListItemDto> = {};
  const idsToAbilities: Record<number, ListItemDto> = {};
  const idsToTypes: Record<number, ListItemDto> = {};

  pokemonResult.forEach((result) => {
    if (result.pokemon_move) {
      idsToMoves[result.pokemon_move.id] = result.pokemon_move;
    }
    if (result.pokemon_ability) {
      idsToAbilities[result.pokemon_ability.id] = result.pokemon_ability;
    }
    if (result.pokemon_type) {
      idsToTypes[result.pokemon_type.id] = result.pokemon_type;
    }
  });
  const defaultSprite = spriteResult[SpriteCategory.Default];
  const shinySprite = spriteResult[SpriteCategory.Shiny];

  const data: PokemonDto = {
    ...extraFields,
    spriteUrl: mainSprite ?? "",
    stats: {
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    },
    moves: Object.values(idsToMoves),
    types: Object.values(idsToTypes),
    abilities: Object.values(idsToAbilities),
    sprites: {
      default: {
        backUrl: defaultSprite.backUrl,
        frontUrl: defaultSprite.frontUrl,
      },
      shiny: {
        backUrl: shinySprite.backUrl,
        frontUrl: shinySprite.frontUrl,
      },
    },
  };

  return {
    data,
    error: null,
  };
};
