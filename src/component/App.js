import React, { useState } from "react";
import "./App.css";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import useCalculator from "../hooks/useCalculator";

const App = () => {
  const [state, setState] = useState({
    total: null,
    next: null,
    operation: null,
  });

  const { calculate } = useCalculator();

  const handleButtonClick = (buttonName) => {
    setState(calculate(state, buttonName));
  };

  return (
    <div className="component-app">
      <Display value={state.next || state.total || "0"} />
      <ButtonPanel onButtonClick={handleButtonClick} />
    </div>
  );
};

export default App;