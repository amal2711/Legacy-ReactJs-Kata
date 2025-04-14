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

  const resetValues = () => {
    return {
      total: null,
      next: null,
      operation: null,
    }
  }
    


  const handleOperationUpdate = (inputValue) =>
    state.next ? { next: state.next + inputValue } : { next: inputValue };

  const handleNextValueUpdate = (inputValue) => {
    const nextValue =
      state.next === "0" ? inputValue : state.next + inputValue;
    return state.next
      ? {
          next: nextValue,
          total: null,
        }
      : {
          next: inputValue,
          total: null,
        };
  };

  const handleNumberInput = (inputValue) => {
    const isZeroEnteredForValueAndOperation =
      inputValue === "0" && state.next === "0";
    if (isZeroEnteredForValueAndOperation) return {};

    return state.operation
      ? handleOperationUpdate(inputValue)
      : handleNextValueUpdate(inputValue);
  };

  const returnModuloResult = () => {
    const result = operate(state.total, state.next, state.operation);
    return {
      total: Big(result).div(Big("100")).toString(),
      next: null,
      operation: null,
    };
  };

  const handleModuloOperation = () => {
    state.operation &&
      state.next &&
      returnModuloResult();
    return state.next
      ? {
          next: Big(state.next).div(Big("100")).toString(),
        }
      : {};
  };

  const handleDotInput = () => {
    if (state.next) {
      // ignore a . if the next number already has one
      if (state.next.includes(".")) {
        return {};
      }
      return { next: state.next + "." };
    }
    return { next: "0." };
  };

  const handleAdditiveInput = () => {
    if (state.next) {
      return { next: (-1 * parseFloat(state.next)).toString() };
    }
    if (state.total) {
      return { total: (-1 * parseFloat(state.total)).toString() };
    }
    return {};
  };

  const handleEqualsInput = () => {
    if (state.next && state.operation) {
      return {
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: null,
      };
    } else {
      return {};
    }
  };


  const calc = (state, inputValue) => {
  
    if (inputValue === "AC") {
     return resetValues()
    }

    if (isNumber(inputValue)) {
      return handleNumberInput(inputValue);
    }

    if (inputValue === "%") {
      return handleModuloOperation();
    }

    if (inputValue === ".") {
      return handleDotInput();
    }
    if (inputValue === "=") {
      return handleEqualsInput();
    }
    if (inputValue === "+/-") {
      return handleAdditiveInput();
    }
    // User pressed an operation button and there is an existing operation
    if (state.operation) {
      return {
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: inputValue,
      };
    }         

    

   

  

    // Button must be an operation

    // When the user presses an operation button without having entered
    // a number first, do nothing.
    // if (!obj.next && !obj.total) {
    //   return {};
    // }

    // User pressed an operation button and there is an existing operation
    if (state.operation) {
      return {
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: inputValue,
      };
    }

    // no operation yet, but the user typed one

    // The user hasn't typed a number yet, just save the operation
    if (!state.next) {
      return { operation: inputValue };
    }

    // save the operation and shift 'next' into 'total'
    return {
      total: state.next,
      next: null,
      operation: inputValue,
    };
  };


  const handleClick = (buttonName) => {
    const newState = calc(state,buttonName);
    setState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  return { handleClick, state };
};