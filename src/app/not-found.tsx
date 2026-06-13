import { Masthead } from "../components/menu/Masthead";
import styles from "../components/menu/menu.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Masthead brand="Solea" tagline="— Taste the sun —" title="Not Found" />
      <section className={styles.emptyState}>
        <h2>This page is resting for now.</h2>
        <p>Please return to the menu.</p>
        <a className={styles.returnLink} href="/menu">
          Return to menu
        </a>
      </section>
    </main>
  );
}
