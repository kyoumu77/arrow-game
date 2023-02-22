import React, { useMemo } from 'react';
import { useSelector } from "react-redux";
import { IconType } from "@react-icons/all-files/lib";
import { FaArrowAltCircleLeft } from "@react-icons/all-files/fa/FaArrowAltCircleLeft";
import { FaArrowAltCircleRight } from "@react-icons/all-files/fa/FaArrowAltCircleRight";
import { FaArrowAltCircleDown } from "@react-icons/all-files/fa/FaArrowAltCircleDown";
import { FaArrowAltCircleUp } from "@react-icons/all-files/fa/FaArrowAltCircleUp";
import { RiErrorWarningFill } from "@react-icons/all-files/ri/RiErrorWarningFill";

import { ActionResult, ActionType } from "../../types";
import { getActionTooltip } from "./utils";
import "./styles.css";
import { selectUserActions } from "../../store/selectors";
import { getSuccesfullHitsInRowCount } from '../../utils/game';
import { SUCESS_ACTIONS_TO_WIN } from '../../constants';

const ACTION_ICONS: Record<ActionType, IconType> = {
  up: FaArrowAltCircleUp,
  down: FaArrowAltCircleDown,
  left: FaArrowAltCircleLeft,
  right: FaArrowAltCircleRight
};

const RESULT_CLASSNAMES: Record<ActionResult, string> = {
  success: "toolbar__action_success",
  failure: "toolbar__action_failure",
  missed: "toolbar__action_missed"
};

export const Toolbar = () => {
  const userActions = useSelector(selectUserActions);
  const successfulHits = useMemo(() => getSuccesfullHitsInRowCount(userActions), [userActions])

  return (
    <div className="toolbar">
      <div className="toolbar__section toolbar__section_actions">
        <div className="toolbar__title">Actions</div>
        <div className="toolbar__actions">
          {userActions.map((action) => {
            const Icon =
              action.result !== "missed"
                ? ACTION_ICONS[action.type]
                : RiErrorWarningFill;

            return (
              <div
                key={action.id}
                className={RESULT_CLASSNAMES[action.result]}
                title={getActionTooltip(action)}
              >
                <Icon size={24} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="toolbar__section">
        <div className="toolbar__title">
          Hit streak {successfulHits} / {SUCESS_ACTIONS_TO_WIN}
        </div>
      </div>
    </div>
  );
};
