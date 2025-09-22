import { Router } from 'express';
import { ProductStockController } from './productStock.controller';

const router = Router();

router.get('/', ProductStockController.getAllProductStock);
router.get('/:id', ProductStockController.getSingleProductStock);

export const ProductStockRoute = router;
