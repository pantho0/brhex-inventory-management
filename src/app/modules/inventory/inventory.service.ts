import mongoose from 'mongoose';
import { IInventoryItem } from './inventory.interface';
import { InventoryItem } from './inventory.model';
import { ProductStock } from '../productStock/productStock.model';

const addInventoryItemIntoDB = async (payload: IInventoryItem) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const inventoryItem = await InventoryItem.create(payload, { session });
    const now = new Date();

    const productStockUpdate = await ProductStock.updateOne(
      {
        product: payload.product,
      },
      { $inc: { inStock: 1 }, $set: { lastUpdated: now } },
      { upsert: true, session },
    );

    await session.commitTransaction();
    return { inventoryItem, productStockUpdate };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const InventoryService = {
  addInventoryItemIntoDB,
};
