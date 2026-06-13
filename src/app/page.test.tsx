import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Home from "./page";

describe("Home", () => {
  test("renders the blank app", () => {
    const { container } = render(<Home />);

    expect(container).toBeInTheDocument();
  });
});
