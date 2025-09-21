import { Router } from 'express';
import { InvoiceController } from './invoice.controller';

const router = Router();

router.post('/create-invoice', InvoiceController.createInvoice);
router.get('/', InvoiceController.getAllInvoices);

export const InvoiceRoute = router;
