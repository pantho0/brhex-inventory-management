/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IInventoryItem } from './inventory.interface';
import { InventoryItem } from './inventory.model';
import { ProductStock } from '../productStock/productStock.model';
import QueryBuilder from '../../builder';
import { inventorySearchableFields } from './inventory.const';

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

export const getInventoryItemsFromDB = async (
  query: Record<string, unknown>,
) => {
  const inventoryQuery = new QueryBuilder(
    InventoryItem.find().populate({
      path: 'product',
      populate: {
        path: 'category',
      },
    }),
    query,
  )
    .search(inventorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await inventoryQuery.countTotal();
  const result = await inventoryQuery.modelQuery;

  return { meta, result };
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

export const getInventoryByProductIdFromDB = async () => {
  const inventoryItem = await InventoryItem.find().populate({
    path: 'product',
    populate: {
      path: 'category',
    },
  });
  return inventoryItem;
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

export const getInventoryFromDB = async () => {
  const stats = await InventoryItem.aggregate([
    {
      $group: {
        _id: '$product', // group by product
        in_stock: {
          $sum: { $cond: [{ $eq: ['$status', 'in_stock'] }, 1, 0] },
        },
        sold: {
          $sum: { $cond: [{ $eq: ['$status', 'sold'] }, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        from: 'products', // MongoDB collection name for products
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        _id: 0,
        productId: '$product._id',
        productName: '$product.name',
        in_stock: 1,
        sold: 1,
      },
    },
    { $sort: { productName: 1 } }, // optional sorting
  ]);

  return stats;
};

export const InventoryService = {
  addInventoryItemIntoDB,
  bulkAddInventoryItemsIntoDB,
  getInventoryItemsFromDB,
  getInventoryBySerialFromDB,
  getInventoryByProductIdFromDB,
  updateInventoryItemIntoDB,
  getInventoryFromDB,
};
