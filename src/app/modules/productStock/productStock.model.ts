import { model, Schema } from 'mongoose';
import { IProductStock } from './productStock.interface';

const productStockSchema = new Schema<IProductStock>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
);

export const ProductStock = model<IProductStock>(
  'ProductStock',
  productStockSchema,
);
