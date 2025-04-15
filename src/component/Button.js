import React from "react";
import "./Button.css";

export const Button =({name, orange, wide, clickHandler}) =>{

    const className = [
      "component-button",
      orange ? "orange" : "",
     wide ? "wide" : "",
    ];

    return (
      <div className={className.join(" ").trim()}>
        <button onClick={clickHandler}>{name}</button>
      </div>
    );
  
}
