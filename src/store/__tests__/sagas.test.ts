import sagaHelper from "redux-saga-testing";
import {
  actionChannel,
  put,
  race,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  changeActionToGuessTask,
  watchActionToGuessChanged,
  watchGameStarted,
} from "../sagas";
import {
  answerActionToGuess,
  changeActionToGuess,
  finishGame,
  missActionToGuess,
  startGame,
} from "../slices/gameSlice";
import * as commonUtils from "../../utils/common";
import { selectCurrentHP, selectUserActions } from "../selectors";

describe("changeActionToGuessTask", () => {
  const it = sagaHelper(changeActionToGuessTask());

  it("should dispatch changeActionToGuess action", (result) => {
    expect(result).toEqual(put(changeActionToGuess()));
  });
});

describe("watchGameStarted", () => {
  const it = sagaHelper(watchGameStarted());

  it("should watch for game starts and call changeActionToGuessTask", (result) => {
    expect(result).toEqual(takeEvery(startGame.type, changeActionToGuessTask));
  });
});

describe("watchActionToGuessChanged - check scenario for receiving user answer in the middle of the game", () => {
  const it = sagaHelper(watchActionToGuessChanged() as any);

  it("should create channel for changeActionToGuess actions", (result) => {
    expect(result).toEqual(actionChannel(changeActionToGuess.type));
    return changeActionToGuess.type;
  });

  it("should wait for changeActionToGuess action", (result) => {
    expect(result).toEqual(take(changeActionToGuess.type));
  });

  it("should wait for user answer", (result) => {
    const spy = jest
      .spyOn(commonUtils, "delay")
      .mockReturnValue(Promise.resolve());

    expect(result).toEqual(
      race({
        task: Promise.resolve(),
        hasUserAnswer: take(answerActionToGuess.type),
      })
    );

    spy.mockClear();

    return { hasUserAnswer: true };
  });

  it("should select userActions after receiving user answer", (result) => {
    expect(result).toEqual(select(selectUserActions));
    return [];
  });

  it("should select current HP after receiving user answer", (result) => {
    expect(result).toEqual(select(selectCurrentHP));
    return 1;
  });

  it("should not finish game and query next changeActionToGuess", (result) => {
    expect(result).toEqual(put(changeActionToGuess()));
  });

  it("should wait for a new changeActionToGuess action and start all over", (result) => {
    expect(result).toEqual(take(changeActionToGuess.type));
  });
});

describe("watchActionToGuessChanged - check scenario for missing user answer in the middle of the game", () => {
  const it = sagaHelper(watchActionToGuessChanged() as any);

  it("should create channel for changeActionToGuess actions", (result) => {
    expect(result).toEqual(actionChannel(changeActionToGuess.type));
    return changeActionToGuess.type;
  });

  it("should wait for changeActionToGuess action", (result) => {
    expect(result).toEqual(take(changeActionToGuess.type));
  });

  it("should wait for user answer", (result) => {
    const spy = jest
      .spyOn(commonUtils, "delay")
      .mockReturnValue(Promise.resolve());

    expect(result).toEqual(
      race({
        task: Promise.resolve(),
        hasUserAnswer: take(answerActionToGuess.type),
      })
    );

    spy.mockClear();

    return { task: Promise.resolve() };
  });

  it("should dispatch missActionToGuess after no answer from user", (result) => {
    expect(result).toEqual(put(missActionToGuess()));
  });

  it("should select userActions after receiving user answer", (result) => {
    expect(result).toEqual(select(selectUserActions));
    return [];
  });

  it("should select current HP after receiving user answer", (result) => {
    expect(result).toEqual(select(selectCurrentHP));
    return 1;
  });

  it("should finish game and query next changeActionToGuess", (result) => {
    expect(result).toEqual(put(changeActionToGuess()));
  });

  it("should wait for a new changeActionToGuess action after game restart and start all over", (result) => {
    expect(result).toEqual(take(changeActionToGuess.type));
  });
});

describe("watchActionToGuessChanged - check scenario for game finish", () => {
  const it = sagaHelper(watchActionToGuessChanged() as any);

  it("should create channel for changeActionToGuess actions", (result) => {
    expect(result).toEqual(actionChannel(changeActionToGuess.type));
    return changeActionToGuess.type;
  });

  it("should wait for changeActionToGuess action", (result) => {
    expect(result).toEqual(take(changeActionToGuess.type));
  });

  it("should wait for user answer", (result) => {
    const spy = jest
      .spyOn(commonUtils, "delay")
      .mockReturnValue(Promise.resolve());

    expect(result).toEqual(
      race({
        task: Promise.resolve(),
        hasUserAnswer: take(answerActionToGuess.type),
      })
    );

    spy.mockClear();

    return { hasUserAnswer: true };
  });

  it("should select userActions after receiving user answer", (result) => {
    expect(result).toEqual(select(selectUserActions));
    return [];
  });

  it("should select current HP after receiving user answer", (result) => {
    expect(result).toEqual(select(selectCurrentHP));
    return 0;
  });

  it("should finish game and query next changeActionToGuess", (result) => {
    expect(result).toEqual(put(finishGame('failed')));
  });

  it("should wait for a new changeActionToGuess action after game restart and start all over", (result) => {
    expect(result).toEqual(take(changeActionToGuess.type));
  });
});
