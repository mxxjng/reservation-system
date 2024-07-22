import "dotenv/config";
import { type Config } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL || "";

export default {
  schema: "./src/schema/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
  verbose: true,
  strict: true,
} satisfies Config;
