import styles from "./admin-qr.module.css";

type QrActionsProps = {
  hasCode: boolean;
  onClear: () => void;
  onExportPdf: () => void;
  onPrint: () => void;
};

export function QrActions({
  hasCode,
  onClear,
  onExportPdf,
  onPrint,
}: QrActionsProps) {
  return (
    <div className={styles.actions}>
      <button
        className={`${styles.btn} ${styles.btnGhost}`}
        disabled={!hasCode}
        onClick={onExportPdf}
        type="button"
      >
        Export PDF
      </button>
      <button
        className={`${styles.btn} ${styles.btnGhost}`}
        disabled={!hasCode}
        onClick={onPrint}
        type="button"
      >
        Print
      </button>
      <button
        className={`${styles.btn} ${styles.btnGhost}`}
        disabled={!hasCode}
        onClick={onClear}
        type="button"
      >
        Clear
      </button>
    </div>
  );
}
