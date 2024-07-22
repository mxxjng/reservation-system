import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/schema";

const url = process.env.DATABASE_URL || "";

export const db = drizzle(postgres(url), { schema });
