import { Router } from 'express';
import { CategoryRoute } from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/category',
    route: CategoryRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
