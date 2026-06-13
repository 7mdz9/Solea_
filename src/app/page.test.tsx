import { describe, expect, test, vi } from "vitest";
import Home from "./page";

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

describe("Home", () => {
  test("redirects to the menu", () => {
    Home();

    expect(redirectMock).toHaveBeenCalledWith("/menu");
  });
});
