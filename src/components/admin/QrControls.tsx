import styles from "./admin-qr.module.css";

type QrControlsProps = {
  feedback: string;
  isError: boolean;
  menuUrl: string;
  onGenerate: () => void;
  onMenuUrlChange: (value: string) => void;
  readOnly: boolean;
};

export function QrControls({
  feedback,
  isError,
  menuUrl,
  onGenerate,
  onMenuUrlChange,
  readOnly,
}: QrControlsProps) {
  return (
    <aside className={`${styles.panel} ${styles.controls}`}>
      <h2>Create QR code</h2>
      <p className={styles.hint}>Generates a code that opens the Solea menu.</p>

      <div className={styles.field}>
        <label htmlFor="baseUrl">Menu address</label>
        <input
          id="baseUrl"
          onChange={(event) => onMenuUrlChange(event.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          type="text"
          value={menuUrl}
        />
      </div>

      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={onGenerate}
        type="button"
      >
        Generate code
      </button>

      <div
        aria-live="polite"
        className={`${styles.feedback} ${isError ? styles.error : ""}`}
        role="status"
      >
        {feedback}
      </div>
    </aside>
  );
}
