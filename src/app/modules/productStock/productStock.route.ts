import { Router } from 'express';
import { ProductStockController } from './productStock.controller';

const router = Router();

router.get('/', ProductStockController.getAllProductStock);

export const ProductStockRoute = router;
