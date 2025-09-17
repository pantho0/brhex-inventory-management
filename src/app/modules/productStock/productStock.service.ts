import { ProductStock } from './productStock.model';

const getAllProductStockFromDB = async () => {
  const result = await ProductStock.find();
  return result;
};

export const ProductStockService = {
  getAllProductStockFromDB,
};
