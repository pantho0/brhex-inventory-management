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

const getInventoryItems = catchAsync(async (req, res) => {
  const result = await InventoryService.getInventoryItemsFromDB();
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
  console.log(req.params.productId);
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

export const InventoryController = {
  addInventoryItem,
  getInventoryItems,
  getInventoryBySerial,
  getInventoryByProductId,
};
