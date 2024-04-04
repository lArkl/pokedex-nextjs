import bcrypt from "bcrypt";
import * as schema from "../database/schema";
import db from "../database/db";
import { eq, sql } from "drizzle-orm";
import { ErrorMessage } from "../lib/errors";

const saltRounds = 12;

const getUserQuery = db.query.users
  .findFirst({ where: eq(schema.users.email, sql.placeholder("email")) })
  .prepare("getUserQuery");

export const getUser = async (params: { email: string; password: string }) => {
  const user = await getUserQuery.execute({ email: params.email });
  if (!user) {
    throw Error(ErrorMessage.userNotFound);
  }
  const success = await bcrypt.compare(params.password, user.password);
  if (success) {
    return user;
  }
  throw Error(ErrorMessage.incorrectPassword);
};

export const createUser = async (params: {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}) => {
  const user = await getUserQuery.execute({ email: params.email });
  if (user) {
    throw Error(ErrorMessage.userExists);
  }
  const password = await bcrypt.hash(params.password, saltRounds);
  const newUser = await db
    .insert(schema.users)
    .values({ ...params, password })
    .returning();
  return {
    firstname: newUser[0].firstname,
    lastname: newUser[0].lastname,
    id: newUser[0].id,
    updatedAt: newUser[0].updatedAt,
  };
};
