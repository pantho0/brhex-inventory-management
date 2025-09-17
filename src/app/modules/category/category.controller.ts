import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoryFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategoryByIdFromDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const updateCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryService.updateCategoryByIdFromDB(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
};
