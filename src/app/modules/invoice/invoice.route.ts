import { Router } from 'express';
import { InvoiceController } from './invoice.controller';

const router = Router();

router.post('/create-invoice', InvoiceController.createInvoice);
router.get('/', InvoiceController.getAllInvoices);
router.get('/:id', InvoiceController.getSingleInvoice);
router.put('/payment/:id', InvoiceController.updatePayment);
router.get('/sales-summary', InvoiceController.getMultiPeriodSalesSummary);

export const InvoiceRoute = router;
