import styles from "./admin-qr.module.css";

export function QrStudioHeader() {
  return (
    <header className={styles.masthead}>
      <div className={styles.brandRow}>
        <div className={styles.wordmark}>
          <span className={styles.name}>Solea</span>
          <span className={styles.tag}>— Taste the sun —</span>
        </div>
        <div className={styles.studioLabel}>
          Menu QR Studio
          <small>Generate codes for soleauae.com/menu</small>
        </div>
      </div>
      <div className={styles.horizon}>
        <div className={styles.tick} />
      </div>
    </header>
  );
}
