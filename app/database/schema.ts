import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  integer,
  real,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const pokemons = pgTable("pokemon", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  hp: integer("hp").notNull(),
  attack: integer("attack").notNull(),
  defense: integer("defense").notNull(),
  mainSprite: text("mainSprite"),
  specialAttack: integer("specialAttack").notNull(),
  specialDefense: integer("specialDefense").notNull(),
  speed: integer("speed").notNull(),
});

export const abilities = pgTable("pokemon_ability", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const moves = pgTable("pokemon_move", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const types = pgTable("pokemon_type", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const sprites = pgTable("pokemon_sprite", {
  id: serial("id").primaryKey(),
  category: integer("category").notNull(),
  frontUrl: text("frontUrl").notNull(),
  backUrl: text("backUrl").notNull(),
  pokemonId: integer("pokemonId").references(() => pokemons.id),
});

export const pokemonToTypes = pgTable(
  "pokemon_types_pokemon_type",
  {
    pokemonId: integer("pokemonId")
      .notNull()
      .references(() => pokemons.id, { onDelete: "cascade" }),
    pokemonTypeId: integer("pokemonTypeId")
      .notNull()
      .references(() => types.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.pokemonId, t.pokemonTypeId] }),
  })
);

export const pokemonToAbilities = pgTable(
  "pokemon_abilities_pokemon_ability",
  {
    pokemonId: integer("pokemonId")
      .notNull()
      .references(() => pokemons.id, { onDelete: "cascade" }),
    pokemonAbilityId: integer("pokemonAbilityId")
      .notNull()
      .references(() => abilities.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.pokemonId, t.pokemonAbilityId] }),
  })
);

export const pokemonToMoves = pgTable(
  "pokemon_moves_pokemon_move",
  {
    pokemonId: integer("pokemonId")
      .notNull()
      .references(() => pokemons.id, { onDelete: "cascade" }),
    pokemonMoveId: integer("pokemonMoveId")
      .notNull()
      .references(() => moves.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.pokemonId, t.pokemonMoveId] }),
  })
);

export const pokemonToTypesRelations = relations(pokemonToTypes, ({ one }) => ({
  pokemon: one(pokemons, {
    fields: [pokemonToTypes.pokemonId],
    references: [pokemons.id],
  }),
  type: one(types, {
    fields: [pokemonToTypes.pokemonTypeId],
    references: [types.id],
  }),
}));

export const pokemonsRelations = relations(pokemons, ({ many }) => ({
  abilities: many(abilities),
  pokemonToMoves: many(pokemonToMoves),
  pokemonToTypes: many(pokemonToTypes),
  sprites: many(sprites),
}));

export const abilitiesRelations = relations(abilities, ({ many }) => ({
  pokemons: many(abilities),
}));

export const movesRelations = relations(moves, ({ many }) => ({
  pokemonToMoves: many(pokemonToMoves),
}));

export const typesRelations = relations(types, ({ many }) => ({
  pokemonToTypes: many(pokemonToTypes),
}));

export const spritesRelations = relations(sprites, ({ one }) => ({
  pokemon: one(pokemons, {
    fields: [sprites.pokemonId],
    references: [pokemons.id],
  }),
}));

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
