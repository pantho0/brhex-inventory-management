import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { barcodeService } from "./barcode.service";


const createBarcode = catchAsync(async (req, res, ) => {
    const result = await barcodeService.generateBarcode()
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Barcode created successfully',
        data: result
    })
})

export const barcodeController = {
    createBarcode
}