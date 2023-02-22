import React from "react";
import { renderWithProviders, screen } from "../../../../test/test-utils";
import { Toolbar } from "..";
import { setupStore } from "../../../store";
import { mockedStoreState } from "../../../../test/storeMock";
import { createUserAction, createUserMissedAction } from "../../../utils/game";
import { SUCESS_ACTIONS_TO_WIN } from "../../../constants";

const USER_ACTIONS = [
  createUserMissedAction(),
  createUserAction("right", "success"),
  createUserAction("up", "success"),
];

describe("Toolbar", () => {
  it("should show no user actions on start", async () => {
    const { container } = renderWithProviders(<Toolbar />);
    const userActionsList =
      container.querySelector(".toolbar__actions")!.children;
    expect(userActionsList).toHaveLength(0);
  });

  it("should show user actions from redux state", async () => {
    const store = setupStore({
      ...mockedStoreState,
      game: { ...mockedStoreState.game, userActions: USER_ACTIONS },
    });
    const { container } = renderWithProviders(<Toolbar />, { store });

    const userActionsList =
      container.querySelector(".toolbar__actions")!.children;
    expect(userActionsList).toHaveLength(USER_ACTIONS.length);
  });

  it("should show 0 successful hits on start", async () => {
    renderWithProviders(<Toolbar />);
    expect(
      await screen.findByText(`Hit streak 0 / ${SUCESS_ACTIONS_TO_WIN}`, {
        exact: true,
        trim: true,
        collapseWhitespace: true,
      })
    ).toBeInTheDocument();
  });

  it("should show the number of successful hits", async () => {
    const store = setupStore({
      ...mockedStoreState,
      game: { ...mockedStoreState.game, userActions: USER_ACTIONS },
    });
    renderWithProviders(<Toolbar />, { store });
    expect(
      await screen.findByText(`Hit streak 2 / ${SUCESS_ACTIONS_TO_WIN}`, {
        exact: true,
        trim: true,
        collapseWhitespace: true,
      })
    ).toBeInTheDocument();
  });
});
