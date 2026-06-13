"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const qrOptions = {
  errorCorrectionLevel: "M" as const,
  width: 300,
  margin: 2,
  color: {
    dark: "#2A271E",
    light: "#ffffff",
  },
};

const pdfQrOptions = {
  ...qrOptions,
  width: 600,
};

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function useQrCodes(initialMenuUrl: string) {
  const [menuUrl, setMenuUrl] = useState(initialMenuUrl);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [encodedUrl, setEncodedUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);

  const generate = async () => {
    const value = menuUrl.trim();

    if (!value) {
      setFeedback("Add a menu address first.");
      setIsError(true);
      return;
    }

    if (!isValidUrl(value)) {
      setFeedback("Use a full menu address, including https://.");
      setIsError(true);
      return;
    }

    const normalizedUrl = value.replace(/\/+$/, "");
    try {
      const dataUrl = await QRCode.toDataURL(normalizedUrl, qrOptions);
      setQrDataUrl(dataUrl);
      setEncodedUrl(normalizedUrl);
      setFeedback("Added the menu code.");
      setIsError(false);
    } catch {
      setFeedback(
        "The code couldn’t be generated just now. Check the menu address and try again.",
      );
      setIsError(true);
    }
  };

  const clear = () => {
    setQrDataUrl(null);
    setEncodedUrl(null);
    setFeedback("Cleared.");
    setIsError(false);
  };

  const exportPdf = async () => {
    if (!encodedUrl) {
      setFeedback("Generate the menu code before exporting.");
      setIsError(true);
      return;
    }

    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });
    let dataUrl: string;
    try {
      dataUrl = await QRCode.toDataURL(encodedUrl, pdfQrOptions);
    } catch {
      setFeedback(
        "The PDF couldn’t be prepared just now. Try again in a moment.",
      );
      setIsError(true);
      return;
    }
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 16;
    const gutter = 8;
    const columns = 3;
    const rows = 4;
    const copies = columns * rows;
    const cellWidth =
      (pageWidth - margin * 2 - gutter * (columns - 1)) / columns;
    const cellHeight = (pageHeight - margin * 2 - gutter * (rows - 1)) / rows;
    const qrSize = Math.min(cellWidth, cellHeight) - 8;

    for (let index = 0; index < copies; index += 1) {
      const row = Math.floor(index / columns);
      const column = index % columns;
      const x = margin + column * (cellWidth + gutter);
      const y = margin + row * (cellHeight + gutter);
      const qrX = x + (cellWidth - qrSize) / 2;
      const qrY = y + (cellHeight - qrSize) / 2;

      doc.setDrawColor(225, 216, 200);
      doc.setLineWidth(0.2);
      doc.rect(x, y, cellWidth, cellHeight);
      doc.addImage(dataUrl, "PNG", qrX, qrY, qrSize, qrSize);
    }

    doc.save("solea-qr-codes.pdf");
    setFeedback("Exported 12 copies to PDF.");
    setIsError(false);
  };

  return {
    clear,
    exportPdf,
    feedback,
    generate,
    isError,
    menuUrl,
    qrDataUrl,
    setMenuUrl,
  };
}
