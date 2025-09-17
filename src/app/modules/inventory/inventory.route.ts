import { Router } from 'express';
import { InventoryController } from './inventory.controller';

const router = Router();

router.post('/add-inventory-item', InventoryController.addInventoryItem);

export const InventoryRoute = router;
