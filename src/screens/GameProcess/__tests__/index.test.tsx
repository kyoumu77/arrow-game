import React from "react";
import { renderWithProviders } from "../../../../test/test-utils";
import { GameProcess } from "..";

describe("GameProcess", () => {
  it("should show current action block", async () => {
    const { container } = renderWithProviders(<GameProcess />);

    const currentAction = container.querySelector(".current-action")!;
    expect(currentAction).toBeInTheDocument();
  });
});
