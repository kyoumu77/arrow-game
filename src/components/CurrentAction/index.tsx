import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconType } from "@react-icons/all-files/lib";
import { FaLongArrowAltLeft } from "@react-icons/all-files/fa/FaLongArrowAltLeft";
import { FaLongArrowAltRight } from "@react-icons/all-files/fa/FaLongArrowAltRight";
import { FaLongArrowAltDown } from "@react-icons/all-files/fa/FaLongArrowAltDown";
import { FaLongArrowAltUp } from "@react-icons/all-files/fa/FaLongArrowAltUp";

import { answerActionToGuess } from "../../store/slices/gameSlice";
import { selectActionToGuess } from "../../store/selectors";
import { ActionType } from "../../types";
import "./styles.css";

const ACTION_ICONS: Record<ActionType, IconType> = {
  up: FaLongArrowAltUp,
  down: FaLongArrowAltDown,
  left: FaLongArrowAltLeft,
  right: FaLongArrowAltRight
};

const KEYS_MAP: Record<string, ActionType> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right"
};

export const CurrentAction = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const actionType = KEYS_MAP[e.key];
      if (actionType) {
        dispatch(answerActionToGuess(actionType));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  const actionToGuess = useSelector(selectActionToGuess);
  if (!actionToGuess) {
    return <div className="current-action" />;
  }

  const Icon = ACTION_ICONS[actionToGuess.value];
  return (
    <div className="current-action">
      <div className="current-action__time-left" key={actionToGuess.id} />

      <div className="current-action__value-wrapper">
        <Icon className="current-action__value" size={150} />
      </div>
    </div>
  );
};
