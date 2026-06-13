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
      ],
    },
  ],
};

describe("useCart", () => {
  test("keeps subtotal correct and does not go negative", () => {
    const { result } = renderHook(() => useCart(menu));

    act(() => result.current.add("toast"));
    act(() => result.current.add("toast"));

    expect(result.current.count).toBe(2);
    expect(result.current.subtotal).toBe(76);

    act(() => result.current.decrement("toast"));
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
