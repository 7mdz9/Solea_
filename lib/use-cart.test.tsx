import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import type { Menu } from "../types/menu";
import { useCart } from "./use-cart";

const menu: Menu = {
  brand: "Solea",
  tagline: "— Taste the sun —",
  title: "Pop-Up Menu",
  footer: "Solea · UAE",
  categories: [
    {
      id: "savory",
      name: "SAVORY",
      items: [
        {
          id: "toast",
          category: "SAVORY",
          name: "Truffle Mushroom Toast on Milk Bread",
          description:
            "Buttery toasted milk bread topped with rich truffle mushrooms.",
          price: 38,
          availability: null,
          image: null,
          tags: [],
          sortOrder: null,
          createdAt: null,
          updatedAt: null,
        },
        {
          id: "tart",
          category: "SWEET",
          name: "Pistachio Raspberry Tart",
          description:
            "Graham biscuit crust, pistachio cream, raspberry confit, and fresh raspberries.",
          price: 36,
          availability: null,
          image: null,
          tags: [],
          sortOrder: null,
          createdAt: null,
          updatedAt: null,
        },
      ],
    },
  ],
};

describe("useCart", () => {
  test("adds, increments, decrements to zero, removes, and totals lines", () => {
    const { result } = renderHook(() => useCart(menu));

    act(() => result.current.add("toast"));
    act(() => result.current.add("toast"));
    act(() => result.current.add("tart"));

    expect(result.current.count).toBe(3);
    expect(result.current.subtotal).toBe(112);

    act(() => result.current.decrement("toast"));

    expect(result.current.count).toBe(2);
    expect(result.current.subtotal).toBe(74);

    act(() => result.current.remove("tart"));

    expect(result.current.count).toBe(1);
    expect(result.current.subtotal).toBe(38);

    act(() => result.current.decrement("toast"));
    act(() => result.current.decrement("toast"));

    expect(result.current.count).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.lines).toEqual([]);
  });

  test("ignores unknown item ids", () => {
    const { result } = renderHook(() => useCart(menu));

    act(() => result.current.add("unknown"));

    expect(result.current.count).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });
});
