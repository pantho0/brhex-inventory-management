/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IInventoryItem } from './inventory.interface';
import { InventoryItem } from './inventory.model';
import { ProductStock } from '../productStock/productStock.model';

const addInventoryItemIntoDB = async (payload: IInventoryItem) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const inventoryItem = await InventoryItem.create([payload], { session });
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

const bulkAddInventoryItemsIntoDB = async (payload: any) => {
  const { product, serialNumber, ...commonDetails } = payload;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const itemsToCreate = serialNumber?.map((serial: string) => ({
      ...commonDetails,
      product,
      serialNumber: serial,
      status: 'in_stock',
    }));

    const createdInventoryItems = await InventoryItem.create(itemsToCreate, {
      session,
      ordered: true,
    });

    const stockIncrementCount = serialNumber?.length;
    const now = new Date();

    const productStockUpdate = await ProductStock.updateOne(
      {
        product: payload.product,
      },
      {
        $inc: { inStock: stockIncrementCount },
        $set: { lastUpdated: now },
      },
      { upsert: true, session },
    );

    await session.commitTransaction();
    return { createdInventoryItems, productStockUpdate };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getInventoryItemsFromDB = async () => {
  const inventoryItems = await InventoryItem.find().populate({
    path: 'product',
    populate: {
      path: 'category',
    },
  });

  return inventoryItems;
};

const getInventoryBySerialFromDB = async (serialNumber: string) => {
  const inventoryItem = await InventoryItem.findOne({ serialNumber }).populate({
    path: 'product',
    populate: {
      path: 'category',
    },
  });
  return inventoryItem;
};

const getInventoryByProductIdFromDB = async (productId: string) => {
  const inventoryItems = await InventoryItem.find({
    product: productId,
  }).populate({
    path: 'product',
    populate: {
      path: 'category',
    },
  });
  return inventoryItems;
};

const updateInventoryItemIntoDB = async (
  id: string,
  payload: IInventoryItem,
) => {
  const inventoryItem = await InventoryItem.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return inventoryItem;
};

export const InventoryService = {
  addInventoryItemIntoDB,
  bulkAddInventoryItemsIntoDB,
  getInventoryItemsFromDB,
  getInventoryBySerialFromDB,
  getInventoryByProductIdFromDB,
  updateInventoryItemIntoDB,
};
