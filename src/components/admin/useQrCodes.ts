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
    const qrSize = 86;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = (pageHeight - qrSize) / 2;

    doc.addImage(dataUrl, "PNG", qrX, qrY, qrSize, qrSize);

    doc.save("solea-qr-codes.pdf");
    setFeedback("Exported code to PDF.");
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
