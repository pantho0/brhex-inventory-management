import { Types } from 'mongoose';

interface IInvoiceItem {
  productId: Types.ObjectId;
  productName: string;
  serialNumber: string;
  warranty: string;
  purchased_price: number;
  price: number;
}

interface IPaymentHistory {
  date: Date;
  amount: number;
  method: string;
}

export interface IInvoice {
  invoiceNo: string;
  customerName: string;
  address?: string;
  mobile?: string;
  items: IInvoiceItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  paymentStatus: 'paid' | 'partial' | 'due';
  paidAmount: number;
  dueAmount: number;
  returnAmount?: number;
  paymentHistory: IPaymentHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}
