"use client";

import { useState } from "react";
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
      setFeedback("Enter a valid menu address.");
      setIsError(true);
      return;
    }

    const dataUrl = await QRCode.toDataURL(
      value.replace(/\/+$/, ""),
      qrOptions,
    );
    setQrDataUrl(dataUrl);
    setFeedback("Added the menu code.");
    setIsError(false);
  };

  const clear = () => {
    setQrDataUrl(null);
    setFeedback("Cleared.");
    setIsError(false);
  };

  return {
    clear,
    feedback,
    generate,
    isError,
    menuUrl,
    qrDataUrl,
    setMenuUrl,
  };
}
