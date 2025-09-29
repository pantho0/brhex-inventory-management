/* eslint-disable @typescript-eslint/no-explicit-any */
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

const getSingleInvoice = catchAsync(async (req, res) => {
  const result = await InvoiceService.getSingleInvoiceByIdFromDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Invoice retrieved successfully',
    data: result,
  });
});

const getAllInvoices = catchAsync(async (req, res) => {
  const result = await InvoiceService.getAllInvoicesFromDB(
    req.query as Record<string, unknown>,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Invoices retrieved successfully',
    data: result,
  });
});

const updatePayment = catchAsync(async (req, res) => {
  const result = await InvoiceService.updatPayment(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Payment updated successfully',
    data: result,
  });
});

const getMultiPeriodSalesSummary = catchAsync(async (req, res) => {
  const result = await InvoiceService.getMultiPeriodSalesSummaryFromDB(
    req.body as any,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Sales summary retrieved successfully',
    data: result,
  });
});

export const InvoiceController = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updatePayment,
  getMultiPeriodSalesSummary,
};
