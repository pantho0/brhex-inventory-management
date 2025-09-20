import mongoose from 'mongoose';
import { IInvoice } from './invoice.interface';
import { Invoice } from './invoice.model';
import { ProductStock } from '../productStock/productStock.model';

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

    const serialNumbers = items.map((i: any) => i.serialNumbers);
    await ProductStock.updateMany(
      {
        serialNumber: { $in: serialNumbers },
      },
      {
        $set: {
          status: 'sold',
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

export const InvoiceService = {
  createInvoiceIntoDB,
};
