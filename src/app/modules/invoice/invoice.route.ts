import { Router } from 'express';
import { InvoiceController } from './invoice.controller';

const router = Router();

router.post('/create-invoice', InvoiceController.createInvoice);
router.post('/sales-summary', InvoiceController.getMultiPeriodSalesSummary);
router.get('/', InvoiceController.getAllInvoices);
router.get('/:id', InvoiceController.getSingleInvoice);
router.put('/payment/:id', InvoiceController.updatePayment);

export const InvoiceRoute = router;
