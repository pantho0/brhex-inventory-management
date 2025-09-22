import { ProductStock } from './productStock.model';

const getAllProductStockFromDB = async () => {
  const result = await ProductStock.find().populate('product');
  return result;
};

const getSingleProductStockFromDB = async (id: string) => {
  const result = await ProductStock.findOne({ product: id }).populate(
    'product',
  );
  return result;
};

export const ProductStockService = {
  getAllProductStockFromDB,
  getSingleProductStockFromDB,
};
