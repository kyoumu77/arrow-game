import React from "react";
import { renderWithProviders, fireEvent } from "../../../../test/test-utils";
import { GameStart } from "..";
import { setupStore } from "../../../store";
import { mockedStoreState } from "../../../../test/storeMock";

describe("GameStart", () => {
  it("should start game on start button click", async () => {
    const store = setupStore(mockedStoreState);
    const { container } = renderWithProviders(<GameStart />);

    const startButton = container.querySelector(".game-start__button")!;
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);
    expect(store.getState().game.actionToGuess).not.toBeUndefined();
  });
});
