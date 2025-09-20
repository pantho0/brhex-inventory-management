import { Router } from 'express';
import { InvoiceController } from './invoice.controller';

const router = Router();

router.post('/create-invoice', InvoiceController.createInvoice);

export const InvoiceRoute = router;
