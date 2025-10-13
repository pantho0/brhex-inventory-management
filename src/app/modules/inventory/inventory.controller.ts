import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InventoryService } from './inventory.service';

const addInventoryItem = catchAsync(async (req, res) => {
  const result = await InventoryService.addInventoryItemIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory item added successfully',
    data: result,
  });
});

const bulkAddInventoryItems = catchAsync(async (req, res) => {
  const result = await InventoryService.bulkAddInventoryItemsIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory items added successfully',
    data: result,
  });
});

const updateInventoryItem = catchAsync(async (req, res) => {
  const result = await InventoryService.updateInventoryItemIntoDB(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory item updated successfully',
    data: result,
  });
});

const getInventoryItems = catchAsync(async (req, res) => {
  const result = await InventoryService.getInventoryItemsFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory items fetched successfully',
    data: result,
  });
});

const getInventoryBySerial = catchAsync(async (req, res) => {
  const result = await InventoryService.getInventoryBySerialFromDB(
    req.params.serialNumber as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory item fetched successfully',
    data: result,
  });
});

const getInventoryByProductId = catchAsync(async (req, res) => {
  const result = await InventoryService.getInventoryByProductIdFromDB(
    req.params.productId as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory item fetched successfully',
    data: result,
  });
});

const getInventory = catchAsync(async (req, res) => {
  const result = await InventoryService.getInventoryFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory table fetched successfully',
    data: result,
  });
});

export const InventoryController = {
  addInventoryItem,
  bulkAddInventoryItems,
  updateInventoryItem,
  getInventoryItems,
  getInventoryBySerial,
  getInventoryByProductId,
  getInventory,
};
