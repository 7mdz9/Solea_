"use client";

import Image from "next/image";
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
  const qrDataUrl = qr.qrDataUrl;

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
                {qrDataUrl ? "1 code" : "No codes yet"}
              </span>
            </div>
            <QrActions
              hasCode={Boolean(qrDataUrl)}
              onClear={qr.clear}
              onExportPdf={qr.exportPdf}
              onPrint={() => window.print()}
            />
          </div>
          <QrCard dataUrl={qrDataUrl} />
          {qrDataUrl ? (
            <div aria-hidden="true" className={styles.printSheet}>
              {Array.from({ length: 12 }, (_, index) => (
                <div className={styles.printCell} key={index}>
                  <Image
                    alt=""
                    height={600}
                    src={qrDataUrl}
                    unoptimized
                    width={600}
                  />
                </div>
              ))}
            </div>
          ) : null}
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
