import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { X } from "react-feather";
import guide from "../assets/guide.png";

function Modal({ text, onClose }) {
  return createPortal(
    <div className="transparent-overlay">
      <section className="portal-overlay">
        <h3>
          {text}
          <span>
            <X onClick={() => onClose(false)} />
          </span>
        </h3>
        <img src={guide} alt="Guide" />
      </section>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  text: "Details",
  onClose: () => alert("Modal Closed!"),
};

export default Modal;
