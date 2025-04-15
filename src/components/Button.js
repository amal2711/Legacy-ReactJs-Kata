import React from "react";
import "./Button.css";

export const Button =({name, orange, wide, clickHandler, testId}) =>{

    const className = [
      "component-button",
      orange ? "orange" : "",
     wide ? "wide" : "",
    ];

    return (
      <div className={className.join(" ").trim()} >
        <button data-testid={testId} onClick={clickHandler}>{name}</button>
      </div>
    );
  
}
