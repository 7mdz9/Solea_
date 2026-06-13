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
        Pay
      </button>
      <div
        className={`${styles.payNotice} ${showNotice ? styles.show : ""}`}
        role="status"
      >
        <strong>Online payment is coming soon.</strong> Secure check
        {"out will be available shortly "}
        &mdash; please pay at the counter for now. Thank you.
      </div>
    </>
  );
}
