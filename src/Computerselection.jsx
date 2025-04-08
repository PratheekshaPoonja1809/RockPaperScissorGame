import React, { useContext, useEffect, useState } from "react";
import { choices, IMAGE_MAP, UserContext } from "./Constants";
import PropTypes from "prop-types";

export function Computerselection({ userInputChange }) {
  const { setFinalSelection } = useContext(UserContext);
  const [compChoice, setCompChoice] = useState("");

  const getRandomChoice = () => {
    if (choices.length === 0) return "";
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
  };

  useEffect(() => {
    const choice = getRandomChoice();
    if (choice) {
      setCompChoice(choice);
      setFinalSelection((prev) => ({
        ...prev,
        compSelectInfo: choice,
      }));
    }
  }, [userInputChange]);

  return (
    <div className="selection-div-cntr">
      <label htmlFor="comp-input-select">
        <strong>Computer Selection:</strong>
      </label>
      <br />
      <img
        id="comp-input-select"
        src={IMAGE_MAP[compChoice]}
        alt={compChoice}
        title={compChoice}
        className={`choosen-img`}
      />
    </div>
  );
}

Computerselection.propTypes = {
  userInputChange: PropTypes.string,
};

Computerselection.defaultProps = {
  userInputChange: choices[0],
};
