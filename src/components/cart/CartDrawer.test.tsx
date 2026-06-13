import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import type { CartLine } from "../../../lib/use-cart";
import { CartDrawer } from "./CartDrawer";

const lines: CartLine[] = [
  {
    item: {
      id: "truffle-mushroom-toast",
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
    quantity: 2,
    lineTotal: 76,
  },
  {
    item: {
      id: "pistachio-raspberry-tart",
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
    quantity: 1,
    lineTotal: 36,
  },
];

describe("CartDrawer", () => {
  test("lists lines and the correct subtotal", () => {
    render(
      <CartDrawer
        lines={lines}
        onClose={vi.fn()}
        onDecrease={vi.fn()}
        onIncrease={vi.fn()}
        onRemove={vi.fn()}
        open
        subtotal={112}
      />,
    );

    expect(
      screen.getByText("Truffle Mushroom Toast on Milk Bread"),
    ).toBeVisible();
    expect(screen.getByText("Pistachio Raspberry Tart")).toBeVisible();
    expect(screen.getByText("AED 76")).toBeVisible();
    expect(screen.getByText("AED 36")).toBeVisible();
    expect(screen.getByText("AED 112")).toBeVisible();
  });

  test("renders an empty state", () => {
    render(
      <CartDrawer
        lines={[]}
        onClose={vi.fn()}
        onDecrease={vi.fn()}
        onIncrease={vi.fn()}
        onRemove={vi.fn()}
        open
        subtotal={0}
      />,
    );

    expect(screen.getByText("Your order is empty.")).toBeVisible();
    expect(screen.getByText("AED 0")).toBeVisible();
  });

  test("calls line actions", async () => {
    const user = userEvent.setup();
    const onDecrease = vi.fn();
    const onIncrease = vi.fn();
    const onRemove = vi.fn();

    render(
      <CartDrawer
        lines={lines.slice(0, 1)}
        onClose={vi.fn()}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        onRemove={onRemove}
        open
        subtotal={76}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Increase" }));
    await user.click(screen.getByRole("button", { name: "Decrease" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(onIncrease).toHaveBeenCalledWith("truffle-mushroom-toast");
    expect(onDecrease).toHaveBeenCalledWith("truffle-mushroom-toast");
    expect(onRemove).toHaveBeenCalledWith("truffle-mushroom-toast");
  });
});
