import Image from "next/image";
import styles from "./admin-qr.module.css";

type QrCardProps = {
  dataUrl: string | null;
};

export function QrCard({ dataUrl }: QrCardProps) {
  if (!dataUrl) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyTitle}>Nothing generated yet</div>
        <div className={styles.emptySub}>
          Use the panel to generate a code. It’ll appear here, ready to export
          or print.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      <div className={styles.qrCard}>
        <div className={styles.qrTile}>
          <Image alt="" height={160} src={dataUrl} unoptimized width={160} />
        </div>
      </div>
    </div>
  );
}
