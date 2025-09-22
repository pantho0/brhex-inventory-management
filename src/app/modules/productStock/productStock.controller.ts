import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductStockService } from './productStock.service';

const getAllProductStock = catchAsync(async (req, res, next) => {
  const result = await ProductStockService.getAllProductStockFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product Stock fetched successfully',
    data: result,
  });
});

const getSingleProductStock = catchAsync(async (req, res) => {
  const result = await ProductStockService.getSingleProductStockFromDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product Stock fetched successfully',
    data: result,
  });
});

export const ProductStockController = {
  getAllProductStock,
  getSingleProductStock,
};
