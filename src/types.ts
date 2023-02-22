import { ACTION_TYPES } from "./constants";

export type ActionType = typeof ACTION_TYPES[number];

export type ActionResult = "success" | "failure" | "missed";

export type Action =
  | {
      id: string;
      type: ActionType;
      result: Exclude<ActionResult, "missed">;
      createdAt: number;
    }
  | {
      id: string;
      result: Extract<ActionResult, "missed">;
      createdAt: number;
    };

export type ActionToGuess = { id: string; value: ActionType };

export type GameResult = "win" | "failed";
