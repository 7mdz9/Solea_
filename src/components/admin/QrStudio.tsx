"use client";

import { QrActions } from "./QrActions";
import { QrCard } from "./QrCard";
import { QrControls } from "./QrControls";
import { QrStudioHeader } from "./QrStudioHeader";
import { useQrCodes } from "./useQrCodes";
import styles from "./admin-qr.module.css";

type QrStudioProps = {
  initialMenuUrl: string;
  readOnly: boolean;
};

export function QrStudio({ initialMenuUrl, readOnly }: QrStudioProps) {
  const qr = useQrCodes(initialMenuUrl);

  return (
    <div className={styles.wrap}>
      <QrStudioHeader />
      <div className={styles.layout}>
        <QrControls
          feedback={qr.feedback}
          isError={qr.isError}
          menuUrl={qr.menuUrl}
          onGenerate={qr.generate}
          onMenuUrlChange={qr.setMenuUrl}
          readOnly={readOnly}
        />
        <main className={styles.previewPanel}>
          <div className={styles.previewHead}>
            <div>
              <h2>QR cards</h2>
              <span className={styles.count}>
                {qr.qrDataUrl ? "1 code" : "No codes yet"}
              </span>
            </div>
            <QrActions hasCode={Boolean(qr.qrDataUrl)} onClear={qr.clear} />
          </div>
          <QrCard dataUrl={qr.qrDataUrl} />
          <p className={styles.footnote}>
            Prototype only &mdash; the code points to{" "}
            <b>https://soleauae.com/menu</b>. Scannability and the live menu are
            verified after deployment.
          </p>
        </main>
      </div>
    </div>
  );
}
