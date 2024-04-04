import db from "./db";
import { sql, getTableName } from "drizzle-orm";
import {
  pokemonToAbilities,
  pokemonToMoves,
  pokemonToTypes,
  pokemons,
  users,
  abilities,
  types,
  moves,
  sprites,
} from "./schema";
import { loadEnvConfig } from "@next/env";

loadEnvConfig("./");

const transactionClause = [
  pokemonToAbilities,
  pokemonToMoves,
  pokemonToTypes,
  abilities,
  types,
  moves,
  sprites,
  pokemons,
  users,
]
  .map((table) => `DROP TABLE "${getTableName(table)}";`)
  .join("\n");

db.execute(sql.raw(transactionClause))
  .then(() => {
    console.log("DROP finished successfully");
  })
  .catch((err) => {
    console.error(err);
  });
