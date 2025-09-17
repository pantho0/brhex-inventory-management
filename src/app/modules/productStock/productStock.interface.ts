import { Types } from 'mongoose';

export interface IProductStock {
  product: Types.ObjectId;
  inStock: number;
  sold: number;
  lastUpdated: Date;
}
