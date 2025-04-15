import Big from "big.js";
import { useState } from "react";
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

  const resetValues = () => {
    updateState({
      total: null,
      next: null,
      operation: null,
    });
  };

  const handleOperationUpdate = inputValue => {
    updateState(
      calculatorState.next ? { next: calculatorState.next + inputValue } : { next: inputValue },
    );
  };

  const handleNextValueUpdate = inputValue => {
    const nextValue = calculatorState.next === "0" ? inputValue : calculatorState.next + inputValue;
    updateState(
      calculatorState.next
        ? {
            next: nextValue,
            total: null,
          }
        : {
            next: inputValue,
            total: null,
          },
    );
  };

  const handleNumberInput = inputValue => {
    const isZeroEnteredForValueAndOperation =
      inputValue === "0" && calculatorState.next === "0";
    if (isZeroEnteredForValueAndOperation) return;

    calculatorState.operation
      ? handleOperationUpdate(inputValue)
      : handleNextValueUpdate(inputValue);
  };

  const returnPercentageResult = () => {
    const result = operate(calculatorState.total, calculatorState.next, calculatorState.operation);
    updateState({
      total: Big(result)
        .div(Big("100"))
        .toString(),
      next: null,
      operation: null,
    });
  };

  const handlePercentageInput = () => {
    if (calculatorState.operation && calculatorState.next) {
      returnPercentageResult();
    } else {
      updateState(
        calculatorState.next
          ? {
              next: Big(calculatorState.next)
                .div(Big("100"))
                .toString(),
            }
          : {},
      );
    }
  };

  const handleDotInput = () => {
    if (calculatorState.next) {
      if (calculatorState.next.includes(".")) {return;}
      updateState({ next: calculatorState.next + "." });
    } else {
      updateState({ next: "0." });
    }
  };

  const handleAdditiveInput = () => {
    if (calculatorState.next) {
      updateState({ next: (-1 * parseFloat(calculatorState.next)).toString() });
    } else if (calculatorState.total) {
      updateState({ total: (-1 * parseFloat(calculatorState.total)).toString() });
    } else {
return    }
  };

  const handleEqualsInput = () => {
    if (calculatorState.next && calculatorState.operation) {
      updateState({
        total: operate(calculatorState.total, calculatorState.next, calculatorState.operation),
        next: null,
        operation: null,
      });
    } else {
    return  
    }
  };

  const handleOperationInput = (inputValue) => {
    if (calculatorState.operation) {
      updateState({
        total: operate(calculatorState.total, calculatorState.next, calculatorState.operation),
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
  };

  const buttons = [
    { inputValue: "AC", handleClick:()=> resetValues() },
    {
      inputValue: "+/-",
      handleClick: ()=>handleAdditiveInput(),
    },
    {
      inputValue: "%",
      handleClick: ()=>handlePercentageInput(),
    },
    {
      inputValue: "÷",
      handleClick: () => handleOperationInput("÷"),
      orange: true,
    },
    {
      inputValue: "7",
      handleClick: () => handleNumberInput("7"),
    },
    {
      inputValue: "8",
      handleClick: () => handleNumberInput("8"),
    },
    {
      inputValue: "9",
      handleClick: () => handleNumberInput("9"),
    },
    {
      inputValue: "x",
      handleClick: () => handleOperationInput( "x"),
      orange: true,
    },
    {
      inputValue: "4",
      handleClick: () => handleNumberInput("4"),
    },
    {
      inputValue: "5",
      handleClick: () => handleNumberInput("5"),
    },
    {
      inputValue: "6",
      handleClick: () => handleNumberInput("6"),
    },
    {
      inputValue: "-",
      handleClick: () => handleOperationInput( "-"),
      orange: true,
    },
    {
      inputValue: "1",
      handleClick: () => handleNumberInput("1"),
    },
    {
      inputValue: "2",
      handleClick: () => handleNumberInput("2"),
    },
    {
      inputValue: "3",
      handleClick: () => handleNumberInput("3"),
    },
    {
      inputValue: "+",
      handleClick: () => handleOperationInput("+"),
      orange: true,
    },
    {
      inputValue: "0",
      handleClick: () => handleNumberInput("0"),
      wide: true,
    },
    {
      inputValue: ".",
      handleClick: () => handleDotInput(),
    },
    {
      inputValue: "=",
      handleClick: () => handleEqualsInput(),
      orange: true,
    },
  ];
  return { calculatorState, buttons };
};
