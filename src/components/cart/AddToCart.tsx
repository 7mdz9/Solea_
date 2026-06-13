"use client";

import { QtyStepper } from "./QtyStepper";
import styles from "./cart.module.css";

type AddToCartProps = {
  quantity: number;
  onAdd: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function AddToCart({
  quantity,
  onAdd,
  onDecrease,
  onIncrease,
}: AddToCartProps) {
  if (quantity > 0) {
    return (
      <QtyStepper
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        quantity={quantity}
      />
    );
  }

  return (
    <button className={styles.addButton} onClick={onAdd} type="button">
      Add to cart
    </button>
  );
}
