import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ category: 1, name: 1 }, { unique: true });

export const Product = model<IProduct>('Product', productSchema);
