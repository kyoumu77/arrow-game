import { RootState } from ".";

export const selectActionToGuess = (state: RootState) =>
  state.game.actionToGuess;

export const selectUserActions = (state: RootState) => state.game.userActions;

export const selectCurrentHP = (state: RootState) => state.game.currentHP;

export const selectIsGameStarted = (state: RootState) =>
  state.game.isGameStarted;

export const selectFinishedGameResult = (state: RootState) =>
  state.game.finishedGameResult;
