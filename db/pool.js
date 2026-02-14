import { Pool } from "pg";

const connectionString = (process.env.NEON_URL || process.env.LOCAL_URL) + "?sslmode=verify-full";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;