import { Router } from 'express';
import { CategoryRoute } from '../modules/category/category.route';
import { ProductRoute } from '../modules/product/product.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
