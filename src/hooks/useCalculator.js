import { useCallback } from "react";
import Big from "big.js";

const useCalculator = () => {
  const isNumber = (item) => /[0-9]+/.test(item);

  const operate = (numberOne, numberTwo, operation) => {
    const one = Big(numberOne || "0");
    const two = Big(numberTwo || (operation === "÷" || operation === "x" ? "1" : "0"));

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
      if (buttonName === "0" && next === "0") return {};
      if (operation) return { next: next ? next + buttonName : buttonName };
      return { next: next ? next + buttonName : buttonName, total: null };
    }

    if (buttonName === "%") {
      if (operation && next) {
        const result = operate(total, next, operation);
        return { total: Big(result).div(Big("100")).toString(), next: null, operation: null };
      }
      if (next) return { next: Big(next).div(Big("100")).toString() };
      return {};
    }

    if (buttonName === ".") {
      if (next?.includes(".")) return {};
      return { next: next ? next + "." : "0." };
    }

    if (buttonName === "=") {
      if (next && operation) {
        return { total: operate(total, next, operation), next: null, operation: null };
      }
      return {};
    }

    if (buttonName === "+/-") {
      if (next) return { next: (-1 * parseFloat(next)).toString() };
      if (total) return { total: (-1 * parseFloat(total)).toString() };
      return {};
    }

    if (operation) {
      return { total: operate(total, next, operation), next: null, operation: buttonName };
    }

    if (!next) return { operation: buttonName };

    return { total: next, next: null, operation: buttonName };
  }, []);

  return { calculate };
};

export default useCalculator;