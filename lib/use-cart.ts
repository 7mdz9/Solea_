"use client";

import { useMemo, useState } from "react";
import type { Menu, MenuItem } from "../types/menu";

export type CartLine = {
  item: MenuItem;
  quantity: number;
  lineTotal: number;
};

export function useCart(menu: Menu) {
  const itemById = useMemo(() => {
    return new Map(
      menu.categories.flatMap((category) =>
        category.items.map((item) => [item.id, item] as const),
      ),
    );
  }, [menu]);

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const add = (id: string) => {
    setQuantities((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }));
  };

  const decrement = (id: string) => {
    setQuantities((current) => {
      const nextQuantity = (current[id] ?? 0) - 1;
      if (nextQuantity <= 0) {
        const rest = { ...current };
        delete rest[id];
        return rest;
      }

      return {
        ...current,
        [id]: nextQuantity,
      };
    });
  };

  const remove = (id: string) => {
    setQuantities((current) => {
      const rest = { ...current };
      delete rest[id];
      return rest;
    });
  };

  const lines = useMemo<CartLine[]>(() => {
    return Object.entries(quantities)
      .map(([id, quantity]) => {
        const item = itemById.get(id);
        if (!item) {
          return null;
        }

        return {
          item,
          quantity,
          lineTotal: item.price * quantity,
        };
      })
      .filter((line): line is CartLine => line !== null);
  }, [itemById, quantities]);

  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  return {
    add,
    decrement,
    remove,
    lines,
    count,
    subtotal,
    quantityOf: (id: string) => quantities[id] ?? 0,
  };
}
