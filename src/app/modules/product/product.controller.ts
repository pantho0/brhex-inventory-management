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

export const ProductController = {
  createProduct,
};
