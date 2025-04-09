import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { X } from "react-feather";
import guide from "../assets/guideline.png";

function Modal({ text, onClose }) {
  return createPortal(
    <div className="transparent-overlay">
      <section className="portal-overlay">
        <h3 className="portal-header">
          {text}
          <span>
            <X onClick={() => onClose(false)} />
          </span>
        </h3>
        <div>
          <p>
            Rock, Paper, Scissors is a quick and fun game played between two
            players - in this case, you vs the computer. The goal is to choose a
            hand gesture that beats your opponent's choice.
          </p>
          <strong>How to Play? </strong>
          <p>
            Get ready for a quick and classic face-off! <br />
            Choose your move - Rock, Paper, or Scissors. The computer picks at
            the same time The winner is decided by these rules:
            <ul className="game-rules">
              <li>Rock crushes Scissors</li>
              <li>Paper covers Rock</li>
              <li>Scissors cut Paper</li>
              <li>Same move? It's a tie</li>
            </ul>
            <em>Make your choice… and may the best pick win!</em>
          </p>
          <img src={guide} alt="Guide" />
        </div>
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
