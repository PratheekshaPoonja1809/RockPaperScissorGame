import React from "react";
import PropTypes from "prop-types";

function Image({ text="Image", className, src }) {
  return (
    <>
      <img src={src} alt={text} className={className} />
    </>
  );
}

Image.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
