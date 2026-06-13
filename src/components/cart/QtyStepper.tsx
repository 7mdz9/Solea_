"use client";

import styles from "./cart.module.css";

type QtyStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QtyStepper({
  quantity,
  onDecrease,
  onIncrease,
}: QtyStepperProps) {
  return (
    <div aria-label="Quantity" className={styles.stepper} role="group">
      <button aria-label="Decrease" onClick={onDecrease} type="button">
        &minus;
      </button>
      <span aria-live="polite" className={styles.qty}>
        {quantity}
      </span>
      <button aria-label="Increase" onClick={onIncrease} type="button">
        +
      </button>
    </div>
  );
}
