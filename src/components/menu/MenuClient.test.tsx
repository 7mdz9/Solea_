import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import type { Menu } from "../../../types/menu";
import { MenuClient } from "./MenuClient";

const emptyMenu: Menu = {
  brand: "Solea",
  tagline: "— Taste the sun —",
  title: "Pop-Up Menu",
  footer: "Solea · UAE",
  categories: [],
};

describe("MenuClient", () => {
  test("renders an empty menu state without crashing", () => {
    render(<MenuClient menu={emptyMenu} />);

    expect(screen.getByText("The menu is resting for now.")).toBeVisible();
    expect(screen.getByText("Please check back shortly.")).toBeVisible();
    expect(screen.getByText("Solea · UAE")).toBeVisible();
  });
});
