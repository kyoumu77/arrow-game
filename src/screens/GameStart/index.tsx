import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header";
import { startGame } from "../../store/slices/gameSlice";
import "./styles.css";

export const GameStart = () => {
  const dispatch = useDispatch();
  const onStart = useCallback(() => dispatch(startGame()), [dispatch]);

  return (
    <>
      <Header />

      <div className="game-start">
        <button className="game-start__button" onClick={onStart}>
          Start
        </button>
      </div>
    </>
  );
};
