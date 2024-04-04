import { loadEnvConfig } from "@next/env";
import db from "./db";
import { sql } from "drizzle-orm";
import { readFile } from "fs";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig("./", dev);

const seedFilename = path.join(path.dirname(__filename), "seed.sql");

readFile(seedFilename, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const transaction = sql.raw(data.toString());

  db.execute(transaction)
    .then(() => {
      console.log("Transaction finished successfully");
    })
    .catch((err) => {
      console.error(err);
    });
});
