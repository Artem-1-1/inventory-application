import queries from '../db/queries.js';
import multer from 'multer';
import { formatProductImage, getFileType } from '../utils/utils.js';

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
    try {
        const result = await queries.getAllProducts();
        const rawProducts = result.rows || result;
        
        const products = rawProducts.map(formatProductImage);

        res.render("products", {
            title: "All products",
            products: products
        });
    } catch (err) {
        console.error("Error in getAllProducts:", err);
        res.status(500).send("Server Error");
    }
};


export async function showProduct(req, res) {
  const id = req.params.id;
  const products = await queries.filterById(id);
  const product = products.rows[0];
  
  if (product && product.image) {
    const mimeType = getFileType(product.image);
    const base64Image = product.image.toString('base64');
    product.imageData = `data:${mimeType};base64,${base64Image}`;
  }

  // console.log(product)
  res.render("viewProduct", { product: product , title : product.name});
};

export async function deleteProduct(req, res) {
    const id = req.params.id;

    await queries.deleteProduct(id);

    res.redirect("/products");
}

export async function editProductGet(req, res) {
    const id = req.params.id;
    const products = await queries.filterById(id);
    const categories = await queries.getAllCategories();
    
    const product = products.rows[0]; 

    if (product && product.image) {
    const mimeType = getFileType(product.image);
    const base64Image = product.image.toString('base64');
    product.imageData = `data:${mimeType};base64,${base64Image}`;
  }

    // console.log(product)
    res.render("editProduct", { product: product , listedCategories: categories, title : `Edit ${product.name}`});
}

export async function editProductPost(req, res) {
  const id = req.params.id;
  let imageBuffer = null;

  const { name, quantity, price, category, brand, description } = req.body;

  if (req.file) {
    imageBuffer = req.file.buffer;
  }

  await queries.editProduct({
    id,
    name,
    quantity,
    price,
    category,
    brand,
    image: imageBuffer,
    description,
  });

  res.redirect(`/products/${id}`);
}