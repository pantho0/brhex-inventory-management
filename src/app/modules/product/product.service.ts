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

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('category');
  return result;
};

const updateProductIntoDB = async (id: string, payload: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('category');
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
};
