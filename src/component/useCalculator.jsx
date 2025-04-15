import Big from "big.js";
import { useState } from "react";

export const useCalculator = () => {
  const [state, setState] = useState({
    total: null,
    next: null,
    operation: null,
  });

  const isNumber = (item) => {
    return /[0-9]+/.test(item);
  };

  const operate = (numberOne, numberTwo, operation) => {
    const one = Big(numberOne || "0");
    const two = Big(
      numberTwo || (operation === "÷" || operation === "x" ? "1" : "0")
    ); //If dividing or multiplying, then 1 maintains current value in cases of null
    if (operation === "+") {
      return one.plus(two).toString();
    }
    if (operation === "-") {
      return one.minus(two).toString();
    }
    if (operation === "x") {
      return one.times(two).toString();
    }
    if (operation === "÷") {
      if (two === "0") {
        alert("Divide by 0 error");
        return "0";
      } else {
        return one.div(two).toString();
      }
    }
    throw Error(`Unknown operation '${operation}'`);
  };

  const updateState = (newState) => {
    setState((prev) => ({
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

  const handleOperationUpdate = (inputValue) => {
    updateState(
      state.next
        ? { next: state.next + inputValue }
        : { next: inputValue }
    );
  };

  const handleNextValueUpdate = (inputValue) => {
    const nextValue = state.next === "0" ? inputValue : state.next + inputValue;
    updateState(
      state.next
        ? {
            next: nextValue,
            total: null,
          }
        : {
            next: inputValue,
            total: null,
          }
    );
  };

  const handleNumberInput = (inputValue) => {
    const isZeroEnteredForValueAndOperation =
      inputValue === "0" && state.next === "0";
    if (isZeroEnteredForValueAndOperation) return;

    state.operation
      ? handleOperationUpdate(inputValue)
      : handleNextValueUpdate(inputValue);
  };

  const returnPercentageResult = () => {
    const result = operate(state.total, state.next, state.operation);
    updateState({
      total: Big(result).div(Big("100")).toString(),
      next: null,
      operation: null,
    });
  };

  const handlePercentageInput = () => {
    if (state.operation && state.next) {
      returnPercentageResult();
    } else {
      updateState(
        state.next
          ? {
              next: Big(state.next).div(Big("100")).toString(),
            }
          : {}
      );
    }
  };

  const handleDotInput = () => {
    if (state.next) {
      if (state.next.includes(".")) {
        return;
      }
      updateState({ next: state.next + "." });
    } else {
      updateState({ next: "0." });
    }
  };

  const handleAdditiveInput = () => {
    if (state.next) {
      updateState({ next: (-1 * parseFloat(state.next)).toString() });
    } else if (state.total) {
      updateState({ total: (-1 * parseFloat(state.total)).toString() });
    } else {
      updateState({});
    }
  };

  const handleEqualsInput = () => {
    if (state.next && state.operation) {
      updateState({
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: null,
      });
    } else {
      updateState({});
    }
  };

  const handleOperationInput = (state, inputValue) => {
    if (state.operation) {
      updateState({
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: inputValue,
      });
    } else if (!state.next) {
      updateState({ operation: inputValue });
    } else {
      updateState({
        total: state.next,
        next: null,
        operation: inputValue,
      });
    }
  };

  const calc = (state, inputValue) => {
    if (inputValue === "AC") {
      resetValues();
    } else if (isNumber(inputValue)) {
      handleNumberInput(inputValue);
    } else if (inputValue === "%") {
      handlePercentageInput();
    } else if (inputValue === ".") {
      handleDotInput();
    } else if (inputValue === "=") {
      handleEqualsInput();
    } else if (inputValue === "+/-") {
      handleAdditiveInput();
    } else {
      handleOperationInput(state, inputValue);
    }
  };

  const handleClick = (buttonName) => {
    calc(state, buttonName);
  };

  return { handleClick, state };
};