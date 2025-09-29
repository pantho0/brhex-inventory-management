import { Router } from 'express';
import { InventoryController } from './inventory.controller';

const router = Router();

router.get('/show-inventory', InventoryController.getInventory);
router.get('/product/:productId', InventoryController.getInventoryByProductId);
router.post('/add-inventory-item', InventoryController.addInventoryItem);
router.post(
  '/bulk-add-inventory-items',
  InventoryController.bulkAddInventoryItems,
);
router.get('/', InventoryController.getInventoryItems);
router.get('/:serialNumber', InventoryController.getInventoryBySerial);
router.put('/update/:id', InventoryController.updateInventoryItem);

export const InventoryRoute = router;
