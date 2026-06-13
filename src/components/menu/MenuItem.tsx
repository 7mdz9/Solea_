import type { ReactNode } from "react";
import type { MenuItem as MenuItemType } from "../../../types/menu";
import { formatAed } from "./money";
import styles from "./menu.module.css";

type MenuItemProps = {
  item: MenuItemType;
  number: string;
  control?: ReactNode;
};

export function MenuItem({ item, number, control }: MenuItemProps) {
  return (
    <article className={`${styles.item} ${styles.reveal}`}>
      <span className={styles.itemNumber}>{number}</span>
      <div className={styles.itemBody}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.price}>{formatAed(item.price)}</span>
        </div>
        <p className={styles.description}>{item.description}</p>
        <div
          className={styles.itemControl}
          data-menu-item-control={item.id}
          aria-hidden={control ? undefined : "true"}
        >
          {control}
        </div>
      </div>
    </article>
  );
}
