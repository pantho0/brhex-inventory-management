import { Types } from 'mongoose';

export interface IInventoryItem {
  product: Types.ObjectId;
  serialNumber: string;
  status?: 'in_stock' | 'sold' | 'in_warranty' | 'returned';
  soldAt?: Date;
  price: number;
}
