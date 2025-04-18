import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ name, orange, wide, onClick }) => {
  const className = [
    "component-button",
    orange ? "orange" : "",
    wide ? "wide" : "",
  ].join(" ").trim();

  return (
    <div className={className}>
      <button onClick={() => onClick(name)}>{name}</button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  orange: PropTypes.bool,
  wide: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;