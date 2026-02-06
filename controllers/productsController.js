import queries from '../db/queries.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const uploadImageMiddleware = upload.single('image');

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

export const createProduct = async (req, res) => {
    const { category_id, pname, price, quantity, brand, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    try {
        await queries.insertNewProduct({ category_id, pname, price, quantity, brand, description, imageData });
        res.redirect('/products');
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).send('Error with add product on server.');
    }
};

export const getAllProducts = async (req, res) => {
    const products = await queries.getAllProducts();

    res.render("products", {
        title: "All products",
        products,
    });
};