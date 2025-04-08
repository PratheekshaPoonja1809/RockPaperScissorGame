import React from "react";
import PropTypes from "prop-types";

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: "Click",
  onClick: () => alert("Button clicked!"),
};

export default Button;
