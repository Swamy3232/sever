import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://postgres:Swamygowda32@db.vegkphzwxjmazpzkofex.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false } // required for cloud DB
});

export default pool;
