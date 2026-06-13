import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { AddToCart } from "./AddToCart";

describe("AddToCart", () => {
  test("swaps to a stepper after adding", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onDecrease = vi.fn();

    const { rerender } = render(
      <AddToCart
        onAdd={onAdd}
        onDecrease={onDecrease}
        onIncrease={onAdd}
        quantity={0}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(onAdd).toHaveBeenCalledTimes(1);

    rerender(
      <AddToCart
        onAdd={onAdd}
        onDecrease={onDecrease}
        onIncrease={onAdd}
        quantity={1}
      />,
    );

    expect(screen.getByRole("group", { name: "Quantity" })).toBeVisible();
    expect(screen.getByText("1")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Add to cart" }),
    ).not.toBeInTheDocument();
  });
});
