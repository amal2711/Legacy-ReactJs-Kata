import React from "react";
import "./App.css";

export const CalculatorDisplay = ({ value }) => {
  return (
    <div className="component-display">
      <div data-testid="Calculator_Result_Display">{value} </div>
    </div>
  );
};
