import React from "react";
import "./App.css";
import {Button} from "./Button";
import { useCalculator } from "./useCalculator";

export const  App =() =>{

  const{handleClick, state}= useCalculator()
  console.log(state)


    return (
      <div className="component-app">
        <div className="component-display">
          <div>{state.next || state.total || "0"} </div>
        </div>
        <div className="component-button-panel">
          <div>
            <Button name="AC" clickHandler={handleClick} />
            <Button name="+/-" clickHandler={handleClick} />
            <Button name="%" clickHandler={handleClick} />
            <Button name="÷" clickHandler={handleClick} orange />
          </div>
          <div>
            <Button name="7" clickHandler={handleClick} />
            <Button name="8" clickHandler={handleClick} />
            <Button name="9" clickHandler={handleClick} />
            <Button name="x" clickHandler={handleClick} orange />
          </div>
          <div>
            <Button name="4" clickHandler={handleClick} />
            <Button name="5" clickHandler={handleClick} />
            <Button name="6" clickHandler={handleClick} />
            <Button name="-" clickHandler={handleClick} orange />
          </div>
          <div>
            <Button name="1" clickHandler={handleClick} />
            <Button name="2" clickHandler={handleClick} />
            <Button name="3" clickHandler={handleClick} />
            <Button name="+" clickHandler={handleClick} orange />
          </div>
          <div>
            <Button name="0" clickHandler={handleClick} wide />
            <Button name="." clickHandler={handleClick} />
            <Button name="=" clickHandler={handleClick} orange />
          </div>
        </div>{" "}
      </div>
    );
  
}
