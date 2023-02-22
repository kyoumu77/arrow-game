import { MAX_HP } from "../../../constants";
import reducer, {
  answerActionToGuess,
  changeActionToGuess,
  finishGame,
  initialState,
  missActionToGuess,
  startGame,
} from "../gameSlice";

describe("GameSlice", () => {
  it("should return the initial state", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should setup state on game start", async () => {
    expect(reducer(undefined, startGame())).toEqual({
      ...initialState,
      isGameStarted: true,
    });
  });

  it("should setup state on game end", async () => {
    expect(reducer(undefined, finishGame('win'))).toEqual({
      ...initialState,
      isGameStarted: false,
      finishedGameResult: "win",
    });
  });

  it("should change action to guess", async () => {
    const initialAction = reducer(undefined, { type: undefined }).actionToGuess;
    expect(initialAction).toBe(undefined);

    const firstAction = reducer(undefined, changeActionToGuess()).actionToGuess;
    expect(firstAction).not.toBe(undefined);

    const secondAction = reducer(
      undefined,
      changeActionToGuess()
    ).actionToGuess;
    expect(secondAction).not.toEqual(firstAction);
  });

  it("should not use user answer if action to guess is empty", async () => {
    expect(
      reducer(
        { ...initialState, actionToGuess: undefined },
        answerActionToGuess("up")
      )
    ).toEqual(initialState);
  });

  it("should use user answer if action to guess is not empty", async () => {
    const state = reducer(undefined, changeActionToGuess());
    const newState = reducer(state, answerActionToGuess(state.actionToGuess?.value === 'up' ? 'down' : 'up'));

    expect(newState).toEqual({
      currentHP: MAX_HP - 1,
      userActions: newState.userActions,
    });
    expect(newState.userActions).toHaveLength(1);
  });

  it("should not use missed answer if action to guess is empty", async () => {
    expect(
      reducer(
        { ...initialState, actionToGuess: undefined },
        missActionToGuess()
      )
    ).toEqual(initialState);
  });

  it("should use missed answer if action to guess is not empty", async () => {
    const state = reducer(undefined, changeActionToGuess());
    const newState = reducer(state, missActionToGuess());

    expect(newState).toEqual({
      currentHP: MAX_HP - 1,
      actionToGuess: undefined,
      userActions: newState.userActions,
    });
    expect(newState.userActions).toHaveLength(1);
  });
});
