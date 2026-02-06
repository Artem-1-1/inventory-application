import { Router } from 'express';

const router = Router();

import { getAddProductPage } from '../controllers/productsController.js'

router.route("/").get((req, res) => {
  res.render("products", { title: "Products catalog" });
});

router.get('/new', getAddProductPage);

export default router;