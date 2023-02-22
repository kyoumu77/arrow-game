import React from "react";
import { renderWithProviders, screen } from "../../../../test/test-utils";
import { GameEnd } from "..";

describe("EndGame", () => {
  it("should show win text and restart button on win", async () => {
    const { container } = renderWithProviders(<GameEnd result="win" />);

    expect(await screen.findByText("You win")).toBeInTheDocument();
    expect(container.querySelector(".game-end__button")).toBeInTheDocument();
  });

  it("should show failed text and restart button on failure", async () => {
    const { container } = renderWithProviders(<GameEnd result="failed" />);

    expect(await screen.findByText("You failed")).toBeInTheDocument();
    expect(container.querySelector(".game-end__button")).toBeInTheDocument();
  });
});
