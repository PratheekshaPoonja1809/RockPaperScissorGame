import React from "react";
import PropTypes from "prop-types";

function Button({ text, onClick, className = "button" }) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  text: "Click",
  onClick: () => alert("Button clicked!"),
};

export default Button;
