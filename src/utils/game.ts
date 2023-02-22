import { ACTION_TYPES, SUCESS_ACTIONS_TO_WIN } from "../constants";
import { Action, ActionType, ActionResult, ActionToGuess, GameResult } from "../types";
import { getRandomInt, generateId } from "./common";

export const getNextActionToGuess = (): ActionToGuess => ({
  id: generateId(),
  value: ACTION_TYPES[getRandomInt(0, ACTION_TYPES.length - 1)]
});

export const createUserAction = (
  type: ActionType,
  result: ActionResult
): Action => ({
  id: generateId(),
  type,
  result,
  createdAt: Date.now()
});

export const createUserMissedAction = (): Action => ({
  id: generateId(),
  result: "missed",
  createdAt: Date.now()
});

/**
 * Calculates the number of the last consecutive successful hits
 * @returns number of hits
 */
export const getSuccesfullHitsInRowCount = (userActions: Action[]): number => {
  const lastUserActions = userActions.slice(-SUCESS_ACTIONS_TO_WIN).reverse();
  let hits = 0;
  for (let userAction of lastUserActions) {
    if (userAction.result !== 'success') {
      break;
    }

    hits += 1;
  }

  return hits;
}

/**
 * Checks game state
 * @returns undefined if the game is still running or GameResult if its finished
 */
export const checkGameState = (userActions: Action[], currentHP: number): GameResult | undefined => {
  if (currentHP <= 0) {
    return 'failed';
  }

  const lastUserActions = userActions.slice(-SUCESS_ACTIONS_TO_WIN);
  const isEnoughActionsToWin = lastUserActions.length === SUCESS_ACTIONS_TO_WIN;
  if (isEnoughActionsToWin && lastUserActions.every(action => action.result === 'success')) {
    return 'win';
  }
}
