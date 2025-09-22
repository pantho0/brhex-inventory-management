import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProductFromDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProductIntoDB(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
};
