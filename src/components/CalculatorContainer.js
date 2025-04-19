import React from "react";
import { useCalculator } from "../logic/useCalculator";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorButtons } from "./CalculatorButtons";

export const CalculatorContainer = () => {
  const { calculatorState, buttons } = useCalculator();

  return (
    <>
      <CalculatorDisplay value={calculatorState.next || calculatorState.total || "0"} />
      <CalculatorButtons buttons={buttons} />
    </>
  );
};
