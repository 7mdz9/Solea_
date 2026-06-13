import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export function createQrDataUrl(value: string) {
  return QRCode.toDataURL(value);
}

export function createPdfDocument() {
  return new jsPDF();
}
