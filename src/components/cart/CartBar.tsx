"use client";

import { formatAed } from "../menu/money";
import styles from "./cart.module.css";

type CartBarProps = {
  count: number;
  subtotal: number;
  onViewOrder: () => void;
};

export function CartBar({ count, subtotal, onViewOrder }: CartBarProps) {
  return (
    <div aria-label="Your order" className={styles.cartBar} role="region">
      <div className={styles.cartSummary}>
        <span className={styles.count}>
          {count} {count === 1 ? "item" : "items"}
        </span>
        <span className={styles.total}>{formatAed(subtotal)}</span>
      </div>
      <button className={styles.viewOrder} onClick={onViewOrder} type="button">
        View order
      </button>
    </div>
  );
}
