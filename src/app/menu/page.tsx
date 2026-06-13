import { getMenu } from "../../../lib/menu-repository";
import { MenuClient } from "../../components/menu/MenuClient";

export default function MenuPage() {
  const menu = getMenu();

  return <MenuClient menu={menu} />;
}
