import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";

import { MAX_HP } from "../../constants";
import { getHPList } from "./utils";
import "./styles.css";
import { selectCurrentHP } from "../../store/selectors";

const ICON_SIZE = 50;

export const HPBar = () => {
  const currentHP = useSelector(selectCurrentHP);
  const hpList = useMemo(() => getHPList(currentHP, MAX_HP), [currentHP]);

  return (
    <div className="hp-bar">
      {hpList.map((isFilled, index) =>
        isFilled ? (
          <AiFillHeart key={index} size={ICON_SIZE} data-test-status="hp-filled" />
        ) : (
          <AiOutlineHeart key={index} size={ICON_SIZE} data-test-status="hp-empty" />
        )
      )}
    </div>
  );
};
