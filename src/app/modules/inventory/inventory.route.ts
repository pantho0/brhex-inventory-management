import { Router } from 'express';
import { InventoryController } from './inventory.controller';

const router = Router();

router.post('/add-inventory-item', InventoryController.addInventoryItem);
router.get('/', InventoryController.getInventoryItems);

export const InventoryRoute = router;
