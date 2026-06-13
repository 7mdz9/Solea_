import styles from "./menu.module.css";

type MenuFooterProps = {
  footer: string;
};

export function MenuFooter({ footer }: MenuFooterProps) {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerMark}>{footer}</span>
    </footer>
  );
}
