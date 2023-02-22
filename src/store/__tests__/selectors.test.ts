import { createUserAction, createUserMissedAction, getNextActionToGuess } from "../../utils/game";
import {
  selectActionToGuess,
  selectUserActions,
  selectCurrentHP,
  selectIsGameStarted,
  selectFinishedGameResult,
} from "../selectors";
import { RootState } from "..";

describe("selectors", () => {
  it("should return correct value for selectActionToGuess action", () => {
    const actionToGuess = getNextActionToGuess();
    const result = selectActionToGuess({
      game: { actionToGuess },
    } as RootState);
    expect(result).toEqual(actionToGuess);
  });

  it("should return correct value for selectUserActions action", () => {
    const userActions = [
      createUserMissedAction(),
      createUserAction('right', 'success'),
      createUserMissedAction(),
    ];
    const result = selectUserActions({ game: { userActions } } as RootState);
    expect(result).toEqual(userActions);
  });

  it("should return correct value for selectCurrentHP action", () => {
    const currentHP = 999;
    const result = selectCurrentHP({ game: { currentHP } } as RootState);
    expect(result).toEqual(currentHP);
  });

  it("should return correct value for selectIsGameStarted action", () => {
    const isGameStarted = true;
    const result = selectIsGameStarted({
      game: { isGameStarted: true },
    } as RootState);
    expect(result).toEqual(isGameStarted);
  });

  it("should return correct value for selectFinishedGameResult action", () => {
    const finishedGameResult = "win";
    const result = selectFinishedGameResult({
      game: { finishedGameResult },
    } as RootState);
    expect(result).toEqual(finishedGameResult);
  });
});
