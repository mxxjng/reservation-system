import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

/* Funtion to migrate the schema to the database */
async function main() {
  const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./migrations" });

  await sql.end();
}

main();
