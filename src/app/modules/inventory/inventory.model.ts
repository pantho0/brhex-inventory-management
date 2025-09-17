import { model, Schema } from 'mongoose';
import { IInventoryItem } from './inventory.interface';

const inventoryItemSchema = new Schema<IInventoryItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['in_stock', 'sold', 'in_warranty', 'returned'],
      default: 'in_stock',
    },
    soldAt: {
      type: Date,
      default: null,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

inventoryItemSchema.index({ serialNumber: 1 }, { unique: true });
inventoryItemSchema.index({ product: 1, status: 1 });
inventoryItemSchema.index({ product: 1, createdAt: -1 });
inventoryItemSchema.index({ status: 1, soldAt: 1 });

export const InventoryItem = model<IInventoryItem>(
  'InventoryItem',
  inventoryItemSchema,
);
