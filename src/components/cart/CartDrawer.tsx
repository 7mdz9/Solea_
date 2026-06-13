"use client";

import { useEffect } from "react";
import type { CartLine } from "../../../lib/use-cart";
import { formatAed } from "../menu/money";
import { PayButton } from "./PayButton";
import { QtyStepper } from "./QtyStepper";
import styles from "./cart.module.css";

type CartDrawerProps = {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  onClose: () => void;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartDrawer({
  open,
  lines,
  subtotal,
  onClose,
  onDecrease,
  onIncrease,
  onRemove,
}: CartDrawerProps) {
  useEffect(() => {
    document.body.classList.toggle("cart-open", open);

    return () => {
      document.body.classList.remove("cart-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <>
      <button
        aria-label="Close order"
        className={`${styles.overlay} ${open ? styles.open : ""}`}
        onClick={onClose}
        type="button"
      />
      <aside
        aria-hidden={!open}
        aria-label="Your order"
        aria-modal="true"
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
      >
        <div className={styles.drawerHead}>
          <h3>Your order</h3>
          <button
            aria-label="Close order"
            className={styles.drawerClose}
            onClick={onClose}
            type="button"
          >
            &times;
          </button>
        </div>
        <div className={styles.drawerBody}>
          {lines.length === 0 ? (
            <div className={styles.emptyCart}>Your order is empty.</div>
          ) : (
            lines.map((line) => (
              <div className={styles.line} key={line.item.id}>
                <span className={styles.lineName}>{line.item.name}</span>
                <span className={styles.linePrice}>
                  {formatAed(line.lineTotal)}
                </span>
                <div className={styles.lineControls}>
                  <QtyStepper
                    onDecrease={() => onDecrease(line.item.id)}
                    onIncrease={() => onIncrease(line.item.id)}
                    quantity={line.quantity}
                  />
                  <button
                    className={styles.lineRemove}
                    onClick={() => onRemove(line.item.id)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.drawerFoot}>
          <div className={styles.subtotalRow}>
            <span className={styles.subtotalLabel}>Subtotal</span>
            <span className={styles.subtotalAmount}>{formatAed(subtotal)}</span>
          </div>
          <p className={styles.footNote}>
            Prices in AED. Taxes shown at check{"out"}.
          </p>
          <PayButton />
        </div>
      </aside>
    </>
  );
}
