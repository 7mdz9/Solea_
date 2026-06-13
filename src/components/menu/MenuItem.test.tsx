import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import type { MenuItem as MenuItemType } from "../../../types/menu";
import { MenuItem } from "./MenuItem";

const item: MenuItemType = {
  id: "truffle-mushroom-toast",
  category: "SAVORY",
  name: "Truffle Mushroom Toast on Milk Bread",
  description: "Buttery toasted milk bread topped with rich truffle mushrooms.",
  price: 38,
  availability: null,
  image: null,
  tags: [],
  sortOrder: null,
  createdAt: null,
  updatedAt: null,
};

describe("MenuItem", () => {
  test("renders name, price, and description", () => {
    render(<MenuItem item={item} number="01" />);

    expect(
      screen.getByText("Truffle Mushroom Toast on Milk Bread"),
    ).toBeVisible();
    expect(screen.getByText("AED 38")).toBeVisible();
    expect(
      screen.getByText(
        "Buttery toasted milk bread topped with rich truffle mushrooms.",
      ),
    ).toBeVisible();
  });
});
