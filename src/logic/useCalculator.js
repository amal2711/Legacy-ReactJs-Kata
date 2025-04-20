import Big from "big.js";
import { useCallback, useState } from "react";
import { operate } from "./utitlity";

export const useCalculator = () => {
  const [calculatorState, setCalculatorState] = useState({
    total: null,
    next: null,
    operation: null,
  });

  const updateState = newState => {
    setCalculatorState(prev => ({
      ...prev,
      ...newState,
    }));
  };

  const getCalculatedTotal = () => operate(
    calculatorState.total,
    calculatorState.next,
    calculatorState.operation,
  )

  const getNegatedString = value => (-1 * parseFloat(value)).toString() 

  const resetCalculator = () => {
    updateState({
      total: null,
      next: null,
      operation: null,
    });
  };

  const appendToNextValue = inputValue => {
    const nextValue =
      calculatorState.next === "0"
        ? inputValue
        : calculatorState.next + inputValue;
    updateState(calculatorState.next?{ next: nextValue, total: null }:{ next: inputValue, total: null });
  };

  const updateNextValue = inputValue => {
    updateState(
      calculatorState.next
        ? { next: calculatorState.next + inputValue }
        : { next: inputValue },
    )
  }
  const handleNumberInput = useCallback(
    inputValue => {
      if (inputValue === "0" && calculatorState.next === "0") return;

      calculatorState.operation
        ? updateNextValue(inputValue)
        : appendToNextValue(inputValue);
    },
    [calculatorState]
  );

  const calculatePercentage = () => {
    updateState({
      total: Big(getCalculatedTotal()).div(Big("100")).toString(),
      next: null,
      operation: null,
    });
  };

  const handlePercentageInput = useCallback(() => {
    if (calculatorState.operation && calculatorState.next) {
      calculatePercentage();
    } else if (calculatorState.next) {
      updateState({
        next: Big(calculatorState.next).div(Big("100")).toString(),
      });
    }
  }, [calculatorState]);

  const handleDotInput = useCallback(() => {
    if (calculatorState.next?.includes(".")) return;
    updateState({ next: calculatorState.next ? calculatorState.next + "." : "0." });
  }, [calculatorState.next]);

  const toggleSign = useCallback(() => {
    if (calculatorState.next) {
      updateState({ next:getNegatedString(calculatorState.next) });
    } else if (calculatorState.total) {
      updateState({ total: getNegatedString(calculatorState.total) });
    }
  }, [calculatorState.next, calculatorState.total]);

  const handleEqualsInput = useCallback(() => {
    if (calculatorState.next && calculatorState.operation) {
      updateState({
        total: getCalculatedTotal(),
        next: null,
        operation: null,
      });
    }
  }, [calculatorState]);

  const handleOperationInput = useCallback(
    inputValue => {
      if (calculatorState.operation) {
        updateState({
          total:getCalculatedTotal(),
          next: null,
          operation: inputValue,
        });
      } else if (!calculatorState.next) {
        updateState({ operation: inputValue });
      } else {
        updateState({
          total: calculatorState.next,
          next: null,
          operation: inputValue,
        });
      }
    },
    [calculatorState],
  );

  const buttons = [
    { inputValue: "AC", handleClick: resetCalculator, testId: "Calculator_AC" },
    { inputValue: "+/-", handleClick: toggleSign, testId: "Calculator_Negation" },
    { inputValue: "%", handleClick: handlePercentageInput, testId: "Calculator_Percentage" },
    { inputValue: "÷", handleClick: () => handleOperationInput("÷"), orange: true, testId: "Calculator_Division" },
    { inputValue: "7", handleClick: () => handleNumberInput("7"), testId: "Calculator_7" },
    { inputValue: "8", handleClick: () => handleNumberInput("8"), testId: "Calculator_8" },
    { inputValue: "9", handleClick: () => handleNumberInput("9"), testId: "Calculator_9" },
    { inputValue: "x", handleClick: () => handleOperationInput("x"), orange: true, testId: "Calculator_Multiplication" },
    { inputValue: "4", handleClick: () => handleNumberInput("4"), testId: "Calculator_4" },
    { inputValue: "5", handleClick: () => handleNumberInput("5"), testId: "Calculator_5" },
    { inputValue: "6", handleClick: () => handleNumberInput("6"), testId: "Calculator_6" },
    { inputValue: "-", handleClick: () => handleOperationInput("-"), orange: true, testId: "Calculator_Subtraction" },
    { inputValue: "1", handleClick: () => handleNumberInput("1"), testId: "Calculator_1" },
    { inputValue: "2", handleClick: () => handleNumberInput("2"), testId: "Calculator_2" },
    { inputValue: "3", handleClick: () => handleNumberInput("3"), testId: "Calculator_3" },
    { inputValue: "+", handleClick: () => handleOperationInput("+"), orange: true, testId: "Calculator_Addition" },
    { inputValue: "0", handleClick: () => handleNumberInput("0"), wide: true, testId: "Calculator_0" },
    { inputValue: ".", handleClick: handleDotInput, testId: "Calculator_Dot" },
    { inputValue: "=", handleClick: handleEqualsInput, orange: true, testId: "Calculator_Equals" },
  ];

  return { calculatorState, buttons };
};
