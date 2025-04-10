import React from "react";
import PropTypes from "prop-types";

function Image({ text, className, src }) {
  return (
    <>
      <img src={src} alt={text} className={className} />
    </>
  );
}

Image.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Image.defaultProps = {
  text: "Click",
  onClick: () => alert("Image clicked!"),
};

export default Image;
