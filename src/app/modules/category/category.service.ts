import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

const getCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryByIdFromDB = async (id: string, payload: ICategory) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getCategoryByIdFromDB,
  updateCategoryByIdFromDB,
};
