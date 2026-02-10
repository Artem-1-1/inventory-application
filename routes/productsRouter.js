import { Router } from 'express';

const router = Router();

import { getAddProductPage, createProduct, uploadImageMiddleware, showProduct, getAllProducts, deleteProduct} from '../controllers/productsController.js';
import { checkPassword } from '../controllers/authenticationController.js';

router.get('/', getAllProducts);
router.get('/new', getAddProductPage);
router.post('/new', uploadImageMiddleware, createProduct);
router.get('/:id', showProduct);
router.post('/check-password', checkPassword);
router.route("/delete/:id").post(deleteProduct);

export default router;