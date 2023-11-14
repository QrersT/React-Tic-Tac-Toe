import React, { createContext, useState } from "react";

import { Game } from "./Components/comp-exp";
import "./style.scss";

export const Context = createContext();

export default function App() {
  return (
    <div>
      {
        <Context.Provider value={5}>
          <Game />
        </Context.Provider>
      }
    </div>
  );
}
