/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IInvoice } from './invoice.interface';
import { Invoice } from './invoice.model';
import { ProductStock } from '../productStock/productStock.model';
import { InventoryItem } from '../inventory/inventory.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Period, SalesSummaryOptions } from '../inventory/inventory.interface';
import QueryBuilder from '../../builder';
import { invoiceSearchableFields } from './invoice.const';

const createInvoiceIntoDB = async (invoiceData: IInvoice) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      invoiceNo,
      customerName,
      mobile,
      address,
      items,
      discount = 0,
      tax = 0,
      paidAmount = 0,
      paymentStatus,
    } = invoiceData;

    const subtotal = items.reduce((acc, item) => acc + item.price, 0);

    const discountedAmount = subtotal - discount;

    const taxAmount = (discountedAmount * tax) / 100;

    const total = discountedAmount + taxAmount;

    let dueAmount = 0;
    let returnAmount = 0;

    if (paidAmount < total) {
      dueAmount = total - paidAmount;
      returnAmount = 0;
    } else if (paidAmount > total) {
      dueAmount = 0;
      returnAmount = paidAmount - total;
    }

    let finalStatus: string;

    if (paymentStatus) {
      finalStatus = paymentStatus;
    } else if (returnAmount > 0) {
      finalStatus = 'paid';
    } else if (dueAmount === 0) {
      finalStatus = 'paid';
    } else if (paidAmount > 0) {
      finalStatus = 'partial';
    } else {
      finalStatus = 'due';
    }

    const invoice = await Invoice.create(
      [
        {
          invoiceNo,
          customerName,
          mobile,
          address,
          items,
          subtotal,
          discount,
          tax,
          total,
          paidAmount,
          dueAmount,
          returnAmount,
          paymentStatus: finalStatus,
          paymentHistory: paidAmount
            ? [{ amount: paidAmount, method: 'cash', date: new Date() }]
            : [],
        },
      ],
      { session },
    );

    const productsIds = items.map((i: any) => i.productId);

    await ProductStock.updateMany(
      { product: { $in: productsIds } },
      { $inc: { inStock: -1, sold: 1 } },
      { session },
    );

    const serialNumbers = items.map((i: any) => i.serialNumber);

    await InventoryItem.updateMany(
      { serialNumber: { $in: serialNumbers } },
      { $set: { status: 'sold', soldAt: new Date() } },
      { session },
    );

    await session.commitTransaction();
    return invoice[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  } finally {
    session.endSession();
  }
};

const getSingleInvoiceByIdFromDB = async (id: string) => {
  const result = await Invoice.findById(id);
  return result;
};

const getAllInvoicesFromDB = async (query: Record<string, unknown>) => {
  const invoiceQuery = new QueryBuilder(Invoice.find(), query)
    .search(invoiceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await invoiceQuery.countTotal();
  const invoices = await invoiceQuery.modelQuery;

  // Map each invoice to include profit
  const resultWithProfit = invoices.map((invoice: any) => {
    const totalPurchasedPrice = invoice.items.reduce(
      (sum: number, item: any) => sum + (item.purchased_price || 0),
      0
    );

    const profit = invoice.total - totalPurchasedPrice;

    return {
      ...invoice.toObject(), // in case it's a Mongoose document
      totalPurchasedPrice,
      profit,
    };
  });

  return { meta, result: resultWithProfit };
};


const updatPayment = async (id: string, paymentData: any) => {
  const { amount, method } = paymentData;

  const invoice = await Invoice.findById(id);

  if (!invoice) {
    throw new AppError(status.NOT_FOUND, 'Invoice not found');
  }

  invoice.paidAmount = invoice.paidAmount + amount;
  invoice.dueAmount = Math.max(invoice.total - invoice.paidAmount, 0);

  invoice.paymentStatus =
    invoice.dueAmount === 0
      ? 'paid'
      : invoice.paidAmount > 0
        ? 'partial'
        : 'due';

  invoice.paymentHistory.push({
    date: new Date(),
    amount,
    method,
  });

  await invoice.save();
  return invoice;
};

export const getMultiPeriodSalesSummaryFromDB = async ({
  periods,
  startDate,
  endDate,
}: SalesSummaryOptions) => {
  const results: Record<Period, any[]> = {
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  };

  const match: any = {};
  if (startDate || endDate) {
    match.createdAt = {};

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      match.createdAt.$gte = start;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      match.createdAt.$lte = end;
    }
  }

  const buildPipeline = (period: Period) => {
    let groupId: any = {};
    let periodLabel: any = {};

    switch (period) {
      case 'daily':
        groupId = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' },
        };
        periodLabel = {
          $concat: [
            { $toString: '$_id.year' },
            '-',
            {
              $cond: [
                { $lt: ['$_id.month', 10] },
                { $concat: ['0', { $toString: '$_id.month' }] },
                { $toString: '$_id.month' },
              ],
            },
            '-',
            {
              $cond: [
                { $lt: ['$_id.day', 10] },
                { $concat: ['0', { $toString: '$_id.day' }] },
                { $toString: '$_id.day' },
              ],
            },
          ],
        };
        break;

      case 'weekly':
        groupId = {
          year: { $isoWeekYear: '$createdAt' },
          week: { $isoWeek: '$createdAt' },
        };
        periodLabel = {
          $concat: [
            { $toString: '$_id.year' },
            '-W',
            {
              $cond: [
                { $lt: ['$_id.week', 10] },
                { $concat: ['0', { $toString: '$_id.week' }] },
                { $toString: '$_id.week' },
              ],
            },
          ],
        };
        break;

      case 'monthly':
        groupId = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        };
        periodLabel = {
          $concat: [
            { $toString: '$_id.year' },
            '-',
            {
              $cond: [
                { $lt: ['$_id.month', 10] },
                { $concat: ['0', { $toString: '$_id.month' }] },
                { $toString: '$_id.month' },
              ],
            },
          ],
        };
        break;

      case 'yearly':
        groupId = { year: { $year: '$createdAt' } };
        periodLabel = { $toString: '$_id.year' };
        break;
    }

    const pipeline: any[] = [];
    if (Object.keys(match).length > 0) pipeline.push({ $match: match });

    pipeline.push(
      {
        $group: {
          _id: groupId,
          totalPaid: { $sum: '$paidAmount' },
          totalDue: { $sum: '$dueAmount' },
          totalSales: { $sum: '$total' },
          invoices: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          periodLabel,
          totalPaid: 1,
          totalDue: 1,
          totalSales: 1,
          invoices: 1,
        },
      },
      { $sort: { periodLabel: 1 } },
    );

    return pipeline;
  };

  for (const period of periods) {
    results[period] = await Invoice.aggregate(buildPipeline(period));
  }

  const cumulativeTotals = await Invoice.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalPaid: { $sum: '$paidAmount' },
        totalDue: { $sum: '$dueAmount' },
        totalSales: { $sum: '$total' },
        invoices: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalPaid: 1,
        totalDue: 1,
        totalSales: 1,
        invoices: 1,
      },
    },
  ]);

  return {
    summary: results,
    cumulativeTotals: cumulativeTotals[0] || {
      totalPaid: 0,
      totalDue: 0,
      totalSales: 0,
      invoices: 0,
    },
  };
};

export const getMultiPeriodIncomeStatementFromDB = async ({
  periods,
  startDate,
  endDate,
}: SalesSummaryOptions) => {

  const match: any = { paymentStatus: "paid" };
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      match.createdAt.$gte = start;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      match.createdAt.$lte = end;
    }
  }

  const results: Record<Period, any[]> = {
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  };

  // --- Fetch all invoices that match ---
  const invoices = await Invoice.find(match).lean();

  // --- Build per-period statements ---
  for (const period of periods) {
    
    const periodData: any[] = [];

    invoices.forEach((inv) => {
      // @ts-ignore
      const created = new Date(inv.createdAt);

      // Profit and total purchased per invoice
      const totalPurchasedPrice = inv.items?.reduce((sum: number, i: any) => sum + i.purchased_price, 0) || 0;
      const profit = (inv.total || 0) - totalPurchasedPrice;

      let periodLabel = "";
      switch (period) {
        case "daily":
          periodLabel = created.toLocaleDateString("en-GB"); // e.g., 16/10/2025
          break;
        case "weekly": {
          const startOfWeek = new Date(created);
          startOfWeek.setDate(created.getDate() - created.getDay() + 1); // Monday
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
          periodLabel = `W${getWeekNumber(created)} (${startOfWeek.toLocaleDateString("en-GB")} - ${endOfWeek.toLocaleDateString("en-GB")})`;
          break;
        }
        case "monthly":
          periodLabel = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
          break;
        case "yearly":
          periodLabel = `${created.getFullYear()}`;
          break;
      }

      periodData.push({
        periodLabel,
        totalPurchasedPrice,
        profit,
        invoices: 1, // Each invoice counts as 1
      });
    });

    results[period] = periodData;
  }

  // --- Cumulative totals ---
  const cumulativeTotals = invoices.reduce(
    (acc, inv) => {
      const totalPurchasedPrice = inv.items?.reduce((sum: number, i: any) => sum + i.purchased_price, 0) || 0;
      const profit = (inv.total || 0) - totalPurchasedPrice;
      return {
        totalPurchasedPrice: acc.totalPurchasedPrice + totalPurchasedPrice,
        profit: acc.profit + profit,
        invoices: acc.invoices + 1,
      };
    },
    { totalPurchasedPrice: 0, profit: 0, invoices: 0 }
  );

  return { summary: results, cumulativeTotals };
};

// --- Helper to get ISO week number ---
function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}



export const InvoiceService = {
  createInvoiceIntoDB,
  getAllInvoicesFromDB,
  updatPayment,
  getMultiPeriodSalesSummaryFromDB,
  getSingleInvoiceByIdFromDB,
  getMultiPeriodIncomeStatementFromDB,
};
