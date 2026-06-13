import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { QrStudio } from "./QrStudio";

describe("QrStudio", () => {
  test("validates input and surfaces messages", async () => {
    const user = userEvent.setup();

    render(
      <QrStudio initialMenuUrl="https://soleauae.com/menu" readOnly={false} />,
    );

    await user.clear(screen.getByLabelText("Menu address"));
    await user.type(screen.getByLabelText("Menu address"), "not-a-url");
    await user.click(screen.getByRole("button", { name: "Generate code" }));

    expect(
      await screen.findByText("Use a full menu address, including https://."),
    ).toBeVisible();
    expect(screen.queryByText("1 code")).not.toBeInTheDocument();
  });
});
