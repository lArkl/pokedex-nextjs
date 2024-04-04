import * as schema from "../database/schema";
import { ListItemDto, PaginatedResponseDto } from "../lib/types";
import { SQL, and, count, inArray, like } from "drizzle-orm";
import { parseNumber, getPageParams } from "./utils";
import db from "../database/db";

export const queryPokemonAbilities = async (
  params: Partial<{
    name: string;
    ids: string[];
    page: string;
  }>
): Promise<PaginatedResponseDto<ListItemDto>> => {
  const { page, pageSize, offset } = getPageParams(params.page);
  const ids = params.ids?.map((id) => parseNumber(id));

  let whereClause: SQL | undefined;
  if (params.name) {
    whereClause = like(schema.abilities.name, `%${params.name}%`);
  }
  if (ids && ids.length > 0) {
    whereClause = and(inArray(schema.abilities.id, ids));
  }

  const recordsQuery = db.select().from(schema.abilities);
  const countQuery = db.select({ count: count() }).from(schema.abilities);

  let records: ListItemDto[];
  let recordCount: number;
  if (whereClause) {
    records = await recordsQuery
      .where(whereClause)
      .offset(offset)
      .limit(pageSize);
    recordCount = await countQuery.where(whereClause).then((r) => r[0].count);
  } else {
    records = await recordsQuery.offset(offset).limit(pageSize);
    recordCount = await countQuery.then((r) => r[0].count);
  }
  return {
    data: {
      items: records,
      page,
      pageSize,
      count: recordCount,
    },
    error: null,
  };
};
