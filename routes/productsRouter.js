import { Router } from 'express';

const router = Router();

import { getAddProductPage, createProduct, uploadImageMiddleware, showProduct, getAllProducts, deleteProduct, editProductGet, editProductPost } from '../controllers/productsController.js';
import { checkPassword } from '../controllers/authenticationController.js';

router.get('/', getAllProducts);
router.get('/new', getAddProductPage);
router.post('/new', uploadImageMiddleware, createProduct);
router.get('/:id', showProduct);
router.post('/check-password', checkPassword);
router.route("/delete/:id").post(deleteProduct);
router.route("/edit/:id")
  .get(editProductGet)
  .post(uploadImageMiddleware, editProductPost);

export default router;