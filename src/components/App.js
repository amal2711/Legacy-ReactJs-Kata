import React from "react";
import "./App.css";
import { Button } from "./Button";
import { useCalculator } from "../logic/useCalculator";

export const App = () => {
  const { calculatorState, buttons } = useCalculator();
  return (
    <div className="component-app">
      <div className="component-display" > 
        <div data-testid={"Calculator_Result_Display"}>{calculatorState.next || calculatorState.total || "0"} </div>
      </div>

      {buttons.map(button => (
        <Button
          key={button.inputValue}
          name={button.inputValue}
          clickHandler={button.handleClick}
          wide={button.wide}
          orange={button.orange}
          testId={button.testId}
        />
      ))}
    </div>
  );
};
