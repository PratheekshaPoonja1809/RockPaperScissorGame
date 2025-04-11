import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { X } from "react-feather";

function Modal({ text="", onClose, children, width }) {
  return createPortal(
    <div className="transparent-overlay flex-center">
      <section className="portal-overlay" style={{width}}>
        <h3 className="portal-header">
          {text}
          <span>
            <X onClick={() => onClose(false)} data-testid="close-icon"/>
          </span>
        </h3>
        {children}
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
  onClose: () => alert("Modal Closed!"),
};

export default Modal;
