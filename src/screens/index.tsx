import React from 'react';
import { useSelector } from "react-redux";
import { GameStart } from "./GameStart";
import { GameEnd } from "./GameEnd";
import { GameProcess } from "./GameProcess";
import {
  selectIsGameStarted,
  selectFinishedGameResult
} from "../store/selectors";

export const Screens = () => {
  const isGameStarted = useSelector(selectIsGameStarted);
  const finishedGameResult = useSelector(selectFinishedGameResult);

  if (finishedGameResult) {
    return <GameEnd result={finishedGameResult} />;
  }

  if (!isGameStarted) {
    return <GameStart />;
  }

  return <GameProcess />;
};
