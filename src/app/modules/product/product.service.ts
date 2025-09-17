import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find().populate('category');
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
};
