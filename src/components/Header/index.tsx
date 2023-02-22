import React from 'react';
import { SUCESS_ACTIONS_TO_WIN } from '../../constants';
import "./styles.css";

export const Header = () => {
  return <div className="header">Guess arrows {SUCESS_ACTIONS_TO_WIN} times in row to win!</div>;
};
