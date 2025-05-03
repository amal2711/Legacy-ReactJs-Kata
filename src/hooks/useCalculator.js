import { useCallback } from "react";
import Big from "big.js";

const useCalculator = () => {
  const isNumber = (item) => /[0-9]+/.test(item);

  const operate = (numberOne, numberTwo, operation) => {
    const one = Big(numberOne || "0");
    const two = numberTwo !== null && numberTwo !== undefined ? Big(numberTwo) : Big("0");

    switch (operation) {
      case "+":
        return one.plus(two).toString();
      case "-":
        return one.minus(two).toString();
      case "x":
        return one.times(two).toString();
      case "÷":
        if (two.eq("0")) {
          alert("Divide by 0 error");
          return "0";
        }
        return one.div(two).toString();
      default:
        throw new Error(`Unknown operation '${operation}'`);
    }
  };

  const calculate = useCallback((state, buttonName) => {
    const { total, next, operation } = state;

    if (buttonName === "AC") {
      return { total: null, next: null, operation: null };
    }

    if (isNumber(buttonName)) {
      if (buttonName === "0" && next === "0") return state;
      if (operation) return { ...state, next: next ? next + buttonName : buttonName };
      return { next: next ? next + buttonName : buttonName, total: null, operation: null };
    }

    if (buttonName === "%") {
      if (next) {
        return { ...state, next: Big(next).div(Big("100")).toString() };
      }
      if (total) {
        return { ...state, total: Big(total).div(Big("100")).toString() };
      }
      return state;
    }

    if (buttonName === ".") {
      if (next?.includes(".")) return state;
      return { ...state, next: next ? next + "." : "0." };
    }

    if (buttonName === "=") {
      if (next && operation) {
        return { total: operate(total, next, operation), next: null, operation: null };
      }
      return state;
    }

    if (buttonName === "+/-") {
      if (next) return { ...state, next: (-1 * parseFloat(next)).toString() };
      if (total) return { ...state, total: (-1 * parseFloat(total)).toString() };
      return state;
    }

    if (operation) {
      if (!next) return { ...state, operation: buttonName };
      return { total: operate(total, next, operation), next: null, operation: buttonName };
    }

    if (!next) return { ...state, operation: buttonName };

    return { total: next, next: null, operation: buttonName };
  }, []);

  return { calculate };
};

export default useCalculator;