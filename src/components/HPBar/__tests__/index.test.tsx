import React from "react";
import { renderWithProviders } from "../../../../test/test-utils";
import { HPBar } from "..";
import { setupStore } from "../../../store";
import { mockedStoreState } from "../../../../test/storeMock";
import { MAX_HP } from "../../../constants";

describe("HPBar", () => {
  it("should show list with user hp", async () => {
    const CURRENT_HP = 1;
    const store = setupStore({
      ...mockedStoreState,
      game: { ...mockedStoreState.game, currentHP: CURRENT_HP },
    });
    const { container } = renderWithProviders(<HPBar />, { store });

    const filledHPList = container.querySelectorAll(
      "[data-test-status=hp-filled]"
    );
    const emptyHPList = container.querySelectorAll(
      "[data-test-status=hp-empty]"
    );

    expect(filledHPList).toHaveLength(CURRENT_HP);
    expect(emptyHPList).toHaveLength(MAX_HP - CURRENT_HP);
  });
});
