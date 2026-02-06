import pool from "./pool.js";

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

export const insertNewProduct = async (productData) => {
    const { category_id, pname, price, quantity, brand, description, imageData } = productData;

    const sql = `
        INSERT INTO products (category_id, name, price, quantity, brand, description, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const result = await pool.query(sql, [category_id, pname, price, quantity, brand, description, imageData]);
    return result;
};


const getAllProducts = async (query = null) => {
    try {
        const { rows } = await pool.query(
            "SELECT products.*, categories.category FROM products JOIN categories ON category_id = categories.id;"
        );

        return rows;
    } catch (err) {
        console.error(err);
    }
};

export default { getAllCategories, insertNewProduct, getAllProducts };