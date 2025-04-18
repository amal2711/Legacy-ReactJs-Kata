import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./ButtonPanel.css";

const ButtonPanel = ({ onButtonClick }) => {
  const groups = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="component-button-panel">
      {groups.map((group, index) => (
        <div key={index} className="button-group">
          {group.map((name) => (
            <Button
              key={name}
              name={name}
              orange={["÷", "x", "-", "+", "="].includes(name)}
              wide={name === "0"}
              onClick={onButtonClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

ButtonPanel.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default ButtonPanel;