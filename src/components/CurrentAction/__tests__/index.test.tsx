import React from "react";
import { renderWithProviders } from "../../../../test/test-utils";
import { mockedStoreState } from "../../../../test/storeMock";
import { CurrentAction } from "..";
import { setupStore } from "../../../store";
import { getNextActionToGuess } from "../../../utils/game";

describe("CurrentAction", () => {
  it("should show current action", async () => {
    const store = setupStore({
      ...mockedStoreState,
      game: { ...mockedStoreState.game, actionToGuess: getNextActionToGuess() },
    });

    const { container } = renderWithProviders(<CurrentAction />, { store });
    expect(
      container.querySelector(".current-action__value")
    ).toBeInTheDocument();
  });

  it("should not show current action if state is empty", async () => {
    const { container } = renderWithProviders(<CurrentAction />);
    expect(
      container.querySelector(".current-action__value")
    ).not.toBeInTheDocument();
  });
});
