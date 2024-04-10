import { PokemonFilterParams } from "@/app/lib/types";
import { queryPokemonAbilities } from "@/app/repository";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get(PokemonFilterParams.Name) ?? "";
  const abilities = searchParams.getAll("ids[]");

  const res = await queryPokemonAbilities({ name, ids: abilities });
  return Response.json(res);
}
