import { Router } from 'express';
import { categoryController } from './category.controller';

const router = Router();

router.post('/create-category', categoryController.createCategory);

export const CategoryRoute = router;
