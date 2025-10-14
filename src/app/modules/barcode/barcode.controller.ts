import catchAsync from "../../utils/catchAsync";
import { barcodeService } from "./barcode.service";

const generateBarcodes = catchAsync(async (req, res) => {
  const pdfBase64 = await barcodeService.generateBarcodePage();
  const pdfBuffer = Buffer.from(pdfBase64, "base64");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader('Content-Disposition', 'attachment; filename="barcodes.pdf"');
  res.send(pdfBuffer);
});

export const barcodeController = {
  generateBarcodes,
};
