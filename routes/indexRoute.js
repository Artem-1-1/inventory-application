import { Router } from 'express';

const router = Router();

import { getAddProductPage } from '../controllers/indexController.js'

router.get('/new', getAddProductPage);

export default router;