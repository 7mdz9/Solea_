import styles from "./menu.module.css";

type MastheadProps = {
  brand: string;
  tagline: string;
  title: string;
};

export function Masthead({ brand, tagline, title }: MastheadProps) {
  return (
    <header className={styles.masthead}>
      <h1 className={styles.wordmark}>{brand}</h1>
      <div className={styles.tagline}>{tagline}</div>
      <div className={styles.eyebrow}>{title}</div>
      <div className={styles.mastheadRule} />
    </header>
  );
}
