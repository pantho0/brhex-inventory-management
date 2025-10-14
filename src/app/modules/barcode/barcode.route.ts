import { Router } from "express";
import { barcodeController } from "./barcode.controller";


const router = Router()

router.post('/', barcodeController.createBarcode)

export const barcodeRoute = router
