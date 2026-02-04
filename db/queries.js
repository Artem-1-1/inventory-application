import pool from "./pool.js";

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

export default { getAllCategories};