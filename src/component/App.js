import React from "react";
import Big from "big.js";
import "./App.css";
import Button from "./Button";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
  };

   isNumber=(item)=> {
    return /[0-9]+/.test(item);
  }


   operate=(numberOne, numberTwo, operation)=> {
    const one = Big(numberOne || "0");
    const two = Big(numberTwo || (operation === "÷" || operation === 'x' ? "1": "0")); //If dividing or multiplying, then 1 maintains current value in cases of null
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
  }
  

  calc = (obj, buttonName) => {
    if (buttonName === "AC") {
      return {
        total: null,
        next: null,
        operation: null,
      };
    }

    if (this.isNumber(buttonName)) {
      if (buttonName === "0" && obj.next === "0") {
        return {};
      }
      // If there is an operation, update next
      if (obj.operation) {
        if (obj.next) {
          return { next: obj.next + buttonName };
        }
        return { next: buttonName };
      }
      // If there is no operation, update next and clear the value
      if (obj.next) {
        const next = obj.next === "0" ? buttonName : obj.next + buttonName;
        return {
          next,
          total: null,
        };
      }
      return {
        next: buttonName,
        total: null,
      };
    }

    if (buttonName === "%") {
      if (obj.operation && obj.next) {
        const result =this.operate(obj.total, obj.next, obj.operation);
        return {
          total: Big(result)
            .div(Big("100"))
            .toString(),
          next: null,
          operation: null,
        };
      }
      if (obj.next) {
        return {
          next: Big(obj.next)
            .div(Big("100"))
            .toString(),
        };
      }
      return {};
    }

    if (buttonName === ".") {
      if (obj.next) {
        // ignore a . if the next number already has one
        if (obj.next.includes(".")) {
          return {};
        }
        return { next: obj.next + "." };
      }
      return { next: "0." };
    }

    if (buttonName === "=") {
      if (obj.next && obj.operation) {
        return {
          total: this.operate(obj.total, obj.next, obj.operation),
          next: null,
          operation: null,
        };
      } else {
        // '=' with no operation, nothing to do
        return {};
      }
    }

    if (buttonName === "+/-") {
      if (obj.next) {
        return { next: (-1 * parseFloat(obj.next)).toString() };
      }
      if (obj.total) {
        return { total: (-1 * parseFloat(obj.total)).toString() };
      }
      return {};
    }

    // Button must be an operation

    // When the user presses an operation button without having entered
    // a number first, do nothing.
    // if (!obj.next && !obj.total) {
    //   return {};
    // }

    // User pressed an operation button and there is an existing operation
    if (obj.operation) {
      return {
        total: this.operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: buttonName,
      };
    }

    // no operation yet, but the user typed one

    // The user hasn't typed a number yet, just save the operation
    if (!obj.next) {
      return { operation: buttonName };
    }

    // save the operation and shift 'next' into 'total'
    return {
      total: obj.next,
      next: null,
      operation: buttonName,
    };
  };

  handleClick = buttonName => {
    this.setState(this.calc(this.state, buttonName));
  };

  render() {
    return (
      <div className="component-app">
        <div className="component-display">
          <div>{this.state.next || this.state.total || "0"} </div>
        </div>
        <div className="component-button-panel">
          <div>
            <Button name="AC" clickHandler={this.handleClick} />
            <Button name="+/-" clickHandler={this.handleClick} />
            <Button name="%" clickHandler={this.handleClick} />
            <Button name="÷" clickHandler={this.handleClick} orange />
          </div>
          <div>
            <Button name="7" clickHandler={this.handleClick} />
            <Button name="8" clickHandler={this.handleClick} />
            <Button name="9" clickHandler={this.handleClick} />
            <Button name="x" clickHandler={this.handleClick} orange />
          </div>
          <div>
            <Button name="4" clickHandler={this.handleClick} />
            <Button name="5" clickHandler={this.handleClick} />
            <Button name="6" clickHandler={this.handleClick} />
            <Button name="-" clickHandler={this.handleClick} orange />
          </div>
          <div>
            <Button name="1" clickHandler={this.handleClick} />
            <Button name="2" clickHandler={this.handleClick} />
            <Button name="3" clickHandler={this.handleClick} />
            <Button name="+" clickHandler={this.handleClick} orange />
          </div>
          <div>
            <Button name="0" clickHandler={this.handleClick} wide />
            <Button name="." clickHandler={this.handleClick} />
            <Button name="=" clickHandler={this.handleClick} orange />
          </div>
        </div>{" "}
      </div>
    );
  }
}
