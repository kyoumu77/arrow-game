import React from "react";
import { renderWithProviders } from "../../../test/test-utils";
import { Screens } from "..";
import { setupStore } from "../../store";
import { mockedStoreState } from "../../../test/storeMock";
import { startGame, finishGame } from "../../store/slices/gameSlice";

describe("Screens", () => {
  it("should show start screen on app load", async () => {
    const { container } = renderWithProviders(<Screens />);
    const gameStart = container.querySelector(".game-start");
    expect(gameStart).toBeInTheDocument();
  });

  it("should show main game screen after start", async () => {
    const store = setupStore(mockedStoreState);
    store.dispatch(startGame());

    const { container } = renderWithProviders(<Screens />, { store });
    const currentAction = container.querySelector(".current-action");
    expect(currentAction).toBeInTheDocument();
  });

  it("should show end screen on game end", async () => {
    const store = setupStore(mockedStoreState);
    store.dispatch(finishGame('win'));

    const { container } = renderWithProviders(<Screens />, { store });
    const gameEnd = container.querySelector(".game-end");
    expect(gameEnd).toBeInTheDocument();
  });
});
