import { Router } from 'express';
import { CategoryController } from './category.controller';

const router = Router();

router.post('/create-category', CategoryController.createCategory);
router.get('/get-all-categories', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.updateCategoryById);

export const CategoryRoute = router;
