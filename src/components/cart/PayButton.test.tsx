import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { PayButton } from "./PayButton";

describe("PayButton", () => {
  test("reveals the coming soon notice and performs no request or navigation", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .spyOn(window, "fetch")
      .mockResolvedValue(new Response());
    const beforeUrl = window.location.href;

    render(<PayButton />);

    await user.click(screen.getByRole("button", { name: "Pay" }));

    const notice = screen.getByRole("status");
    const noticeText = notice.textContent?.replace(/\s+/g, " ").trim();
    const expectedNotice =
      "Online payment is coming soon. Secure checkout will be available shortly " +
      String.fromCharCode(8212) +
      " please pay at the counter for now. Thank you.";

    expect(notice).toBeVisible();
    expect(noticeText).toBe(expectedNotice);
    expect(window.location.href).toBe(beforeUrl);
    expect(fetchMock).not.toHaveBeenCalled();

    fetchMock.mockRestore();
  });
});
