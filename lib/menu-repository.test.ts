import { describe, expect, test } from "vitest";
import { getMenu } from "./menu-repository";

const expectedItems = [
  {
    name: "Truffle Mushroom Toast on Milk Bread",
    description:
      "Buttery toasted milk bread topped with rich truffle mushrooms.",
    price: 38,
  },
  {
    name: "Roasted Leek, Feta & Spinach Quiche",
    description:
      "Buttery flaky pastry filled with roasted leeks, baby spinach, and whipped feta.",
    price: 34,
  },
  {
    name: "Tomato Tatin Puff",
    description:
      "Caramelized tomatoes baked on crisp puff pastry with Parmesan cream and fresh basil.",
    price: 32,
  },
  {
    name: "Zaatar & Labneh Laminated Brioche",
    description:
      "Buttery laminated brioche filled with whipped labneh, premium zaatar, and extra virgin olive oil.",
    price: 30,
  },
  {
    name: "Pistachio Raspberry Tart",
    description:
      "Graham biscuit crust, pistachio cream, raspberry confit, and fresh raspberries.",
    price: 36,
  },
  {
    name: "Coconut Strawberry Shortcake",
    description:
      "Light chiffon sponge with coconut cream and fresh strawberries.",
    price: 32,
  },
  {
    name: "The Peanut",
    description:
      "Peanut praline, milk chocolate mousse, peanut crunch, and caramelized peanuts.",
    price: 34,
  },
  {
    name: "Lemon Yuzu Madeleine",
    description: "Citrus-forward classic French sponge cake.",
    price: 18,
  },
];

describe("getMenu", () => {
  test("returns the approved menu content", () => {
    const menu = getMenu();
    const items = menu.categories.flatMap((category) => category.items);

    expect(menu.categories).toHaveLength(2);
    expect(items).toHaveLength(8);
    expect(
      items.map(({ name, description, price }) => ({
        name,
        description,
        price,
      })),
    ).toEqual(expectedItems);
  });
});
