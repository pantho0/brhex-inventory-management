import { Types } from 'mongoose';

export interface IProduct {
  category: Types.ObjectId;
  name: string;
}
