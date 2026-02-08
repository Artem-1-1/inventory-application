import { Router } from 'express';
import queries from '../db/queries.js';

const router = Router();

import { getAddProductPage, createProduct, uploadImageMiddleware, showProduct, getAllProducts} from '../controllers/productsController.js'

router.get('/', getAllProducts);

router.get('/new', getAddProductPage);

router.post('/new', uploadImageMiddleware, createProduct);

router.get('/:id', showProduct);

export default router;