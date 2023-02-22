import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { Toolbar } from "../../components/Toolbar";
import { startGame } from "../../store/slices/gameSlice";
import { GameResult } from "../../types";
import "./styles.css";

type EndGameProps = {
  result: GameResult;
};

export const GameEnd = ({ result }: EndGameProps) => {
  const dispatch = useDispatch();
  const onRestart = useCallback(() => dispatch(startGame()), [dispatch]);

  return (
    <>
      <Header />

      <div className="game-end">
        <div className={`game-end__title game-end__title_${result}`}>
          You {result}
        </div>

        <button className="game-end__button" onClick={onRestart}>
          Try again
        </button>
      </div>

      <Toolbar />
    </>
  );
};
