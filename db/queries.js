import pool from "./pool.js";

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategoryIdByName(categoryName) {
    const { rows } = await pool.query(
        `SELECT id FROM categories WHERE category = $1`,
        [categoryName]
    );
    return rows[0].id;
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

async function filterById(id) {
  const rows = pool.query(
    "SELECT products.*, categories.category FROM products JOIN categories ON products.category_id = categories.id WHERE products.id = $1",
        [id]
  );
  return rows;
}

async function deleteProduct(id) {
    await pool.query(
        "DELETE FROM products WHERE id = $1",
        [id]
    );
}

async function editProduct({
  id,
  name,
  quantity,
  price,
  category,
  brand,
  image, // Renamed from 'src' to match DB column
  description,
}) {
  const updates = [];
  const values = [];
  let index = 1;

  if (name) {
        updates.push(`name = $${index++}`);
        values.push(name);
    }

  if (quantity) {
        updates.push(`quantity = $${index++}`);
        values.push(quantity);
    }
  if (price) {
        updates.push(`price = $${index++}`);
        values.push(price);
    }
  if (category) {
        const categoryId = await getCategoryIdByName(category);
        if (categoryId) {
            updates.push(`category_id = $${index++}`);
            values.push(categoryId);
        } else {
            throw new Error("Invalid category.");
        }
  }

  if (brand) {
        updates.push(`brand = $${index++}`);
        values.push(brand);
  }

  if (description) {
        updates.push(`description = $${index++}`);
        values.push(description);
  }

  if (image) {
    updates.push(`image = $${index++}`);
    values.push(image);
  }

  if (updates.length > 0) {
    const query = `UPDATE products SET ${updates.join(
      ", "
    )} WHERE id = $${index}`;
    values.push(id);
    await pool.query(query, values);
  }
}


export default { getAllCategories, insertNewProduct, getAllProducts, filterById, deleteProduct, editProduct};