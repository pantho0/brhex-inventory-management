import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InventoryService } from './inventory.service';

const addInventoryItem = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await InventoryService.addInventoryItemIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Inventory item added successfully',
    data: result,
  });
});

export const InventoryController = {
  addInventoryItem,
};
