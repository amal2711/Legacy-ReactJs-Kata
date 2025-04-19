import React from "react";
import { Button } from "./Button";

export const CalculatorButtons = ({ buttons }) => {
  return (
    <div className="component-buttons">
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
