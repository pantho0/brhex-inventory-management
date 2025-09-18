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
      items,
      subtotal,
      discount,
      tax,
      total,
      paymentStatus,
      paidAmount,
    } = invoiceData;

    let dueAmount = total - (paidAmount || 0);

    const invoice = await Invoice.create(
      [
        {
          invoiceNo,
          customerName,
          items,
          subtotal,
          discount,
          tax,
          total,
          paymentStatus: paymentStatus || (dueAmount === 0 ? 'paid' : 'due'),
          paidAmount: paidAmount || 0,
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
    return invoice;
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
