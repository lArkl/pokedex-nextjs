import { Option } from "../lib/types";
import db from "../database/db";

export async function queryPokemonTypes(): Promise<Option[]> {
  const types = await db.query.types.findMany();
  return types.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
}
