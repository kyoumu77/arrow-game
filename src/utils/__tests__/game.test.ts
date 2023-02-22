import {
  getSuccesfullHitsInRowCount,
  checkGameState,
  getNextActionToGuess,
  createUserAction,
  createUserMissedAction,
} from "../game";
import { ACTION_TYPES, MAX_HP, SUCESS_ACTIONS_TO_WIN } from "../../constants";

describe("getSuccesfullHitsInRowCount", () => {
  it("should return 0 for empty list of user actions", () => {
    const result = getSuccesfullHitsInRowCount([]);
    expect(result).toBe(0);
  });

  it("should return the number of last succesfull hits for filled user actions", () => {
    const userActions = [createUserMissedAction(), createUserAction('right', 'success'), createUserAction('up', 'success')];
    const result = getSuccesfullHitsInRowCount(userActions);
    expect(result).toBe(2);
  });
});

describe("checkGameState", () => {
  it("should return failed if user HP <= 0", () => {
    const resultFor0HP = checkGameState([], 0);
    expect(resultFor0HP).toBe('failed');

    const resultForNegativeHP = checkGameState([], -1);
    expect(resultForNegativeHP).toBe('failed');
  });

  it("should return win if user has enough succesfull hits", () => {
    const userActions = [createUserMissedAction()];
    for (let i = 0; i < SUCESS_ACTIONS_TO_WIN; i++) {
      userActions.push(createUserAction('right', 'success'));
    }

    const result = checkGameState(userActions, MAX_HP);
    expect(result).toBe('win');
  });

  it("should return undefined if user HP is more than 0", () => {
    const result = checkGameState([], MAX_HP);
    expect(result).toBeUndefined();
  });
});

describe("getNextActionToGuess", () => {
  it("gets next action to guess", () => {
    const result = getNextActionToGuess();
    expect(typeof result.id).toBe("string");
    expect(ACTION_TYPES).toContain(result.value);
  });
});

describe("createUserAction", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("creates user action", () => {
    const result = createUserAction("left", "success");
    expect(result).toStrictEqual({
      id: result.id,
      type: "left",
      result: "success",
      createdAt: Date.now(),
    });
  });
});

describe("createUserMissedAction", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("creates user missed action", () => {
    const result = createUserMissedAction();
    expect(result).toStrictEqual({
      id: result.id,
      result: "missed",
      createdAt: Date.now(),
    });
  });
});
