"use client";

import { useState } from "react";
import styles from "./cart.module.css";

export function PayButton() {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <>
      <button
        className={styles.payButton}
        onClick={() => setShowNotice(true)}
        type="button"
      >
        Proceed to checkout
      </button>
      <div
        className={`${styles.payNotice} ${showNotice ? styles.show : ""}`}
        role="status"
      >
        Online checkout is coming soon. Secure payment will be available shortly
        &mdash; please order at the counter for now. Thank you.
      </div>
    </>
  );
}
