import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InvoiceService } from './invoice.service';

const createInvoice = catchAsync(async (req, res) => {
  const result = await InvoiceService.createInvoiceIntoDB(req.body as any);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Invoice created successfully',
    data: result,
  });
});

const getAllInvoices = catchAsync(async (req, res) => {
  const result = await InvoiceService.getAllInvoicesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Invoices retrieved successfully',
    data: result,
  });
});

export const InvoiceController = {
  createInvoice,
  getAllInvoices,
};
