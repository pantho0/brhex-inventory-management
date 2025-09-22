import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.post('/create-product', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getSingleProduct);
router.put('/:id', ProductController.updateProduct);

export const ProductRoute = router;
