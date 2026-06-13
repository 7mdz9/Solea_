import type { MenuCategory } from "../../../types/menu";
import { MenuItem } from "./MenuItem";
import styles from "./menu.module.css";

type MenuSectionProps = {
  category: MenuCategory;
  number: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function MenuSection({ category, number }: MenuSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2>{category.name}</h2>
        <span className={styles.rule} />
        <span className={styles.sectionNumber}>{number}</span>
      </div>
      <div className={styles.items}>
        {category.items.map((item, index) => (
          <MenuItem item={item} key={item.id} number={pad(index + 1)} />
        ))}
      </div>
    </section>
  );
}
