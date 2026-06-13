import { Masthead } from "../../components/menu/Masthead";
import { MenuFooter } from "../../components/menu/MenuFooter";
import { MenuSection } from "../../components/menu/MenuSection";
import { getMenu } from "../../../lib/menu-repository";
import styles from "../../components/menu/menu.module.css";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function MenuPage() {
  const menu = getMenu();

  return (
    <main className={styles.page}>
      <Masthead brand={menu.brand} tagline={menu.tagline} title={menu.title} />
      {menu.categories.map((category, index) => (
        <MenuSection
          category={category}
          key={category.id}
          number={pad(index + 1)}
        />
      ))}
      <MenuFooter footer={menu.footer} />
    </main>
  );
}
