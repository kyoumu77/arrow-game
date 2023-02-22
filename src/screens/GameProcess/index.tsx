import React from "react";
import { CurrentAction } from "../../components/CurrentAction";
import { Header } from "../../components/Header";
import { HPBar } from "../../components/HPBar";
import { Toolbar } from "../../components/Toolbar";

export const GameProcess = () => (
  <>
    <Header />
    <CurrentAction />
    <HPBar />
    <Toolbar />
  </>
);
