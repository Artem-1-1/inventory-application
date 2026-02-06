import queries from '../db/queries.js';

export async function getAddProductPage(req, res) {
  try {
    const categories = await queries.getAllCategories();
    
    res.render('form', { 
      listedCategories: categories,
      title : "Add Product" 
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).send("Internal Server Error");
  }
}