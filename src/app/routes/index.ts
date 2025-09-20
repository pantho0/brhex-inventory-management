import { Router } from 'express';
import { CategoryRoute } from '../modules/category/category.route';
import { ProductRoute } from '../modules/product/product.route';
import { ProductStockRoute } from '../modules/productStock/productStock.route';
import { InventoryRoute } from '../modules/inventory/inventory.route';
import { InvoiceRoute } from '../modules/invoice/invoice.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/product',
    route: ProductRoute,
  },
  {
    path: '/product-stock',
    route: ProductStockRoute,
  },
  {
    path: '/inventory',
    route: InventoryRoute,
  },
  {
    path: '/invoice',
    route: InvoiceRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
