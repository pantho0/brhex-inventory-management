import { model, Schema } from 'mongoose';
import { IInvoice } from './invoice.interface';

const invoiceSchema = new Schema<IInvoice>(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        productName: String,
        serialNumber: String,
        warranty: String,
        purchased_price: Number,
        price: Number,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    total: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    returnAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'partial', 'due'],
      default: 'due',
    },
    paymentHistory: [
      {
        date: Date,
        amount: Number,
        method: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Invoice = model<IInvoice>('Invoice', invoiceSchema);
