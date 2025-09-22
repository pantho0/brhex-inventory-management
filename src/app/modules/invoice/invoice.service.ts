import mongoose from 'mongoose';
import { IInvoice } from './invoice.interface';
import { Invoice } from './invoice.model';
import { ProductStock } from '../productStock/productStock.model';
import { InventoryItem } from '../inventory/inventory.model';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createInvoiceIntoDB = async (invoiceData: IInvoice) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      invoiceNo,
      customerName,
      mobile,
      address,
      items,
      discount = 0,
      tax = 0,
      paidAmount = 0,
      paymentStatus,
    } = invoiceData;

    const subtotal = items.reduce((acc, item) => acc + item.price, 0);

    const discountedAmount = subtotal - discount;

    const taxAmount = (discountedAmount * tax) / 100;

    const total = discountedAmount + taxAmount;

    const dueAmount = total - paidAmount;

    const finalStatus =
      paymentStatus ||
      (dueAmount === 0 ? 'paid' : paidAmount > 0 ? 'partial' : 'due');

    const invoice = await Invoice.create(
      [
        {
          invoiceNo,
          customerName,
          mobile,
          address,
          items,
          subtotal,
          discount,
          tax,
          total,
          paymentStatus: finalStatus,
          paidAmount,
          dueAmount,
          paymentHistory: paidAmount
            ? [{ amount: paidAmount, method: 'cash', date: new Date() }]
            : [],
        },
      ],
      { session },
    );

    const productsIds = items.map((i: any) => i.productId);

    await ProductStock.updateMany(
      {
        product: { $in: productsIds },
      },
      {
        $inc: {
          inStock: -1,
          sold: 1,
        },
      },
      { session },
    );

    const serialNumbers = items.map((i: any) => i.serialNumber);
    console.log(serialNumbers);

    await InventoryItem.updateMany(
      {
        serialNumber: { $in: serialNumbers },
      },
      {
        $set: {
          status: 'sold',
          soldAt: new Date(),
        },
      },
      { session },
    );

    await session.commitTransaction();
    return invoice[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllInvoicesFromDB = async () => {
  const result = await Invoice.find();
  return result;
};

const updatPayment = async (id: string, paymentData: any) => {
  const { amount, method } = paymentData;

  const invoice = await Invoice.findById(id);

  if (!invoice) {
    throw new AppError(status.NOT_FOUND, 'Invoice not found');
  }

  invoice.paidAmount += amount;
  invoice.dueAmount = Math.max(invoice.total - invoice.paidAmount, 0);

  invoice.paymentStatus =
    invoice.dueAmount === 0
      ? 'paid'
      : invoice.paidAmount > 0
        ? 'partial'
        : 'due';

  invoice.paymentHistory.push({
    date: new Date(),
    amount,
    method,
  });

  await invoice.save();
  return invoice;
};

export const InvoiceService = {
  createInvoiceIntoDB,
  getAllInvoicesFromDB,
  updatPayment,
};
