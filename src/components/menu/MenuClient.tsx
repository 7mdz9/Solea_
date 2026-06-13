"use client";

import { useState } from "react";
import { useCart } from "../../../lib/use-cart";
import type { Menu } from "../../../types/menu";
import { AddToCart } from "../cart/AddToCart";
import { CartBar } from "../cart/CartBar";
import { CartDrawer } from "../cart/CartDrawer";
import { Masthead } from "./Masthead";
import { MenuFooter } from "./MenuFooter";
import { MenuSection } from "./MenuSection";
import styles from "./menu.module.css";

type MenuClientProps = {
  menu: Menu;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function MenuClient({ menu }: MenuClientProps) {
  const cart = useCart(menu);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <main
        className={`${styles.page} ${cart.count > 0 ? styles.pageCartActive : ""}`}
      >
        <Masthead
          brand={menu.brand}
          tagline={menu.tagline}
          title={menu.title}
        />
        {menu.categories.map((category, index) => (
          <MenuSection
            category={category}
            key={category.id}
            number={pad(index + 1)}
            renderControl={(item) => (
              <AddToCart
                onAdd={() => cart.add(item.id)}
                onDecrease={() => cart.decrement(item.id)}
                onIncrease={() => cart.add(item.id)}
                quantity={cart.quantityOf(item.id)}
              />
            )}
          />
        ))}
        <MenuFooter footer={menu.footer} />
      </main>
      {cart.count > 0 ? (
        <CartBar
          count={cart.count}
          onViewOrder={() => setDrawerOpen(true)}
          subtotal={cart.subtotal}
        />
      ) : null}
      <CartDrawer
        lines={cart.lines}
        onClose={() => setDrawerOpen(false)}
        onDecrease={cart.decrement}
        onIncrease={cart.add}
        onRemove={cart.remove}
        open={drawerOpen}
        subtotal={cart.subtotal}
      />
    </>
  );
}
