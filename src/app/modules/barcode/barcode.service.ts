import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Get ISO week number of the year
const getWeekNumber = (date: Date) => {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

// Generate a unique serial with week number and year
const generateSerial = (usedSerials: Set<string>): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const now = new Date();
  const weekNo = getWeekNumber(now).toString().padStart(2, "0"); // W01-W52
  const yearLast2 = (now.getFullYear() % 100).toString().padStart(2, "0"); // last 2 digits
  let serial: string;
  do {
    const randomPart = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    serial = `BCC-W${weekNo}-${yearLast2}-${randomPart}`;
  } while (usedSerials.has(serial));
  usedSerials.add(serial);
  return serial;
};

const generateBarcodePage = async (): Promise<string> => {
  const CM_TO_PT = 28.35;
  const BARCODE_WIDTH = 3.9 * CM_TO_PT;   // barcode width
  const BARCODE_HEIGHT = 1.5 * CM_TO_PT;  // barcode height
  const PAGE_MARGIN = 36;                 // 0.5 inch
  const HORIZONTAL_GAP = 20;              // horizontal gap between barcodes
  const VERTICAL_GAP = 35;                // vertical gap between barcodes (increased)

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  const barcodesPerRow = Math.floor((A4_WIDTH - 2 * PAGE_MARGIN + HORIZONTAL_GAP) / (BARCODE_WIDTH + HORIZONTAL_GAP));
  const barcodesPerColumn = Math.floor((A4_HEIGHT - 2 * PAGE_MARGIN + VERTICAL_GAP) / (BARCODE_HEIGHT + VERTICAL_GAP));
  const totalBarcodes = barcodesPerRow * barcodesPerColumn;

  // Centering horizontally
  const totalRowWidth = barcodesPerRow * BARCODE_WIDTH + (barcodesPerRow - 1) * HORIZONTAL_GAP;
  const startX = (A4_WIDTH - totalRowWidth) / 2;
  const startY = A4_HEIGHT - PAGE_MARGIN;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 10;

  const barcodeCanvas = createCanvas(BARCODE_WIDTH, BARCODE_HEIGHT);
  const usedSerials = new Set<string>();

  for (let i = 0; i < totalBarcodes; i++) {
    const row = Math.floor(i / barcodesPerRow);
    const col = i % barcodesPerRow;

    const serial = generateSerial(usedSerials);

    JsBarcode(barcodeCanvas, serial, {
      format: "CODE128",
      displayValue: false,
      width: 2,
      height: barcodeCanvas.height,
      margin: 0,
    });

    const pngBuffer = barcodeCanvas.toBuffer("image/png");
    const embeddedImage = await pdfDoc.embedPng(pngBuffer);

    const x = startX + col * (BARCODE_WIDTH + HORIZONTAL_GAP);
    const y = startY - (row + 1) * (BARCODE_HEIGHT + VERTICAL_GAP) + VERTICAL_GAP;

    // Draw barcode
    page.drawImage(embeddedImage, {
      x,
      y: y + 12,
      width: BARCODE_WIDTH,
      height: BARCODE_HEIGHT,
    });

    // Draw serial text aligned under its barcode
    page.drawText(serial, {
      x: x + 2,
      y: y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes).toString("base64");
};

export const barcodeService = {
  generateBarcodePage,
};
