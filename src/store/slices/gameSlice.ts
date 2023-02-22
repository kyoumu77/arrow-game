import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Action,
  ActionResult,
  ActionToGuess,
  ActionType,
  GameResult
} from "../../types";
import { MAX_HP } from "../../constants";
import {
  getNextActionToGuess,
  createUserAction,
  createUserMissedAction
} from "../../utils/game";

export type GameState = {
  /** Current arrow on screen to guess */
  actionToGuess?: ActionToGuess;
  /** List of user arrow presses */
  userActions: Action[];
  /** Current HP of user */
  currentHP: number;
  /** Is game started or is it start/end screens */
  isGameStarted?: boolean;
  /** Last game results (win/failed) */
  finishedGameResult?: GameResult;
};

export const initialState: GameState = {
  userActions: [],
  currentHP: MAX_HP
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      delete state.finishedGameResult;
      state.userActions = [];
      state.currentHP = MAX_HP;
    },
    finishGame: (state, action: PayloadAction<GameResult>) => {
      state.isGameStarted = false;
      state.finishedGameResult = action.payload;
    },
    changeActionToGuess: (state) => {
      state.actionToGuess = getNextActionToGuess();
    },
    answerActionToGuess: (state, action: PayloadAction<ActionType>) => {
      if (!state.actionToGuess) {
        return;
      }

      let result: ActionResult = "success";

      if (action.payload !== state.actionToGuess.value) {
        state.currentHP -= 1;
        result = "failure";
      }

      delete state.actionToGuess;
      state.userActions.push(createUserAction(action.payload, result));
    },
    missActionToGuess: (state) => {
      if (!state.actionToGuess) {
        return;
      }

      state.currentHP -= 1;
      delete state.actionToGuess;
      state.userActions.push(createUserMissedAction());
    }
  }
});

export const {
  startGame,
  finishGame,
  changeActionToGuess,
  answerActionToGuess,
  missActionToGuess
} = gameSlice.actions;

export default gameSlice.reducer;
