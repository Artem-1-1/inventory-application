import { Router } from 'express';
import queries from '../db/queries.js';

const router = Router();

import { getAddProductPage, createProduct, uploadImageMiddleware} from '../controllers/productsController.js'

router.route("/").get(async(req, res) => {
  try {
    const products = await queries.getAllProducts(); 
    res.render("products", {
            title: "All products",
            products: products || [] 
        });
  } catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get('/new', getAddProductPage);

router.post('/new', uploadImageMiddleware, createProduct);

export default router;