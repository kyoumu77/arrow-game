import {
  takeEvery,
  take,
  put,
  race,
  select,
  all,
  actionChannel
} from "redux-saga/effects";
import { Channel } from "redux-saga";
import {
  startGame,
  finishGame,
  changeActionToGuess,
  answerActionToGuess,
  missActionToGuess
} from "./slices/gameSlice";
import { selectCurrentHP, selectUserActions } from "./selectors";
import { TIME_PER_ACTION } from "../constants";
import { delay } from "../utils/common";
import { Action } from "../types";
import { checkGameState } from "../utils/game";

export function* changeActionToGuessTask() {
  yield put(changeActionToGuess());
}

export function* watchGameStarted() {
  yield takeEvery(startGame.type, changeActionToGuessTask);
}

export function* watchActionToGuessChanged() {
  const channel: Channel<{}> = yield actionChannel(changeActionToGuess.type);

  while (true) {
    yield take(channel);

    const { hasUserAnswer } = yield race({
      task: delay(TIME_PER_ACTION),
      hasUserAnswer: take(answerActionToGuess.type)
    });

    if (!hasUserAnswer) {
      yield put(missActionToGuess());
    }

    const userActions: Action[] = yield select(selectUserActions);
    const currentHP: number = yield select(selectCurrentHP);

    const gameState = checkGameState(userActions, currentHP);
    if (gameState) {
      yield put(finishGame(gameState));
    } else {
      yield put(changeActionToGuess());
    }
  }
}

export function* rootSaga() {
  yield all([watchGameStarted(), watchActionToGuessChanged()]);
}
