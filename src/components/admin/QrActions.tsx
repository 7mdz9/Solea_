import styles from "./admin-qr.module.css";

type QrActionsProps = {
  hasCode: boolean;
  onClear: () => void;
};

export function QrActions({ hasCode, onClear }: QrActionsProps) {
  return (
    <div className={styles.actions}>
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
