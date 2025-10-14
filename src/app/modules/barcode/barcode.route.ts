import { Router } from "express";
import { barcodeController } from "./barcode.controller";


const router = Router()


router.post('/generate', barcodeController.generateBarcodes)

export const barcodeRoute = router
